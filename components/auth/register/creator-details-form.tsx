"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
import { FaArrowRight } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { checkGeneralDetails } from "@/actions/auth/register/check-general-details";

type Props = {
  step: number;
  defaultData: any;
  onContinue: (values: z.infer<typeof GeneralDetailsSchema>) => void;
};

export const CreatorDetailsForm = ({
  step,
  defaultData,
  onContinue
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const form = useForm<z.infer<typeof GeneralDetailsSchema>>({
    resolver: zodResolver(GeneralDetailsSchema),
    defaultValues: {
      ...defaultData
    }
  });

  const onSubmit = (values: z.infer<typeof GeneralDetailsSchema>) => {
    startTransition(() => {
      checkGeneralDetails(values).then((data) => {
        if (data.success) {
          onContinue(values);
        } else {
          setConfirmMessage(data.error as string);
          setConfirmOpen(true);
        }
      });
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title="Error"
        message={confirmMessage}
        onOK={() => setConfirmOpen(false)}
      />
      <p className="text-xl text-green-700">
        {step + 1}. Please provide your KRE8TOR details.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6"
        >
          <div className="flex flex-col gap-y-4">
            <FormLabel>Cover Image & Avatar</FormLabel>
            <Avatar className="w-full h-28 rounded-none">
              <AvatarImage src={coverImagePath} className="object-cover" />
              <AvatarFallback className="bg-sky-500">
                <div className="w-full h-full bg-inherit"></div>
              </AvatarFallback>
            </Avatar>
            <Input
              disabled={isDisabled()}
              type="file"
              accept="image/*"
              onChange={onCoverChanged}
            />
          </div>
          <div className="flex items-end space-x-4">
            <Avatar className="w-24 h-24 rounded-xl">
              <AvatarImage src={avatarImagePath} />
              <AvatarFallback className="bg-sky-500">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
            <Input
              disabled={isDisabled()}
              type="file"
              accept="image/*"
              onChange={onAvatarChanged}
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
                    <FormLabel>Phone Number1</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Phone Number"
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
                    <FormLabel>Phone Number2</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Phone Number"
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
                        placeholder="username@myemail.com"
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
