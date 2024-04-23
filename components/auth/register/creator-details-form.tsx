"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
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
import { CreatorDetailsSchema } from "@/schemas/auth/register";
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CREATOR_TYPES } from "@/assets/creator-types";

type Props = {
  defaultData: z.infer<typeof CreatorDetailsSchema>;
  onContinue: (values: z.infer<typeof CreatorDetailsSchema>) => void;
  onBack: (values: z.infer<typeof CreatorDetailsSchema>) => void;
};

export const CreatorDetailsForm = ({
  defaultData,
  onContinue,
  onBack
}: Props) => {
  const typeOfUserList = CREATOR_TYPES;

  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const [avatar, setAvatar] = useState<File | undefined>(defaultData?.avatar);
  const [avatarImagePath, setAvatarImagePath] = useState<string>(
    defaultData?.avatar ? URL.createObjectURL(defaultData.avatar) : ""
  );
  const hiddenAvatarFileInput = useRef<HTMLInputElement>(null);

  const [cover, setCover] = useState<File | undefined>(defaultData?.cover);
  const [coverImagePath, setCoverImagePath] = useState<string>(
    defaultData?.cover ? URL.createObjectURL(defaultData.cover) : ""
  );
  const hiddenCoverFileIniput = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof CreatorDetailsSchema>>({
    resolver: zodResolver(CreatorDetailsSchema),
    defaultValues: {
      ...defaultData
    }
  });

  const onSubmit = (values: z.infer<typeof CreatorDetailsSchema>) => {
    startTransition(() => {
      onContinue({
        ...values,
        avatar,
        cover
      });
    });
  };

  const onBackClicked = () => {
    onBack({ ...form.getValues(), avatar, cover });
  };

  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImagePath(URL.createObjectURL(e.target.files[0]));
      setAvatar(e?.target?.files?.[0]);
    }
  };

  const onCoverChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImagePath(URL.createObjectURL(e.target.files[0]));
      setCover(e?.target?.files?.[0]);
    }
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
        3. Please provide your KRE8TOR details.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6"
        >
          <div className="flex flex-col items-start gap-y-4">
            <FormLabel>Avatar Image</FormLabel>
            <div className="flex items-end gap-x-6">
              <Avatar className="w-24 h-24 rounded-[24px]">
                <AvatarImage src={avatarImagePath} />
                <AvatarFallback className="bg-sky-500 rounded-[24px]">
                  <FaUser className="text-white" />
                </AvatarFallback>
              </Avatar>
              <Button
                disabled={isPending}
                type="button"
                variant={"outline"}
                className="border-green-700"
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
          <div className="flex flex-col gap-y-4">
            <FormLabel>Cover Image</FormLabel>
            <Avatar className="w-full h-28 rounded-xl">
              <AvatarImage src={coverImagePath} className="object-cover" />
              <AvatarFallback className="bg-sky-400 rounded-xl">
                <div className="w-full h-full bg-inherit"></div>
              </AvatarFallback>
            </Avatar>
            <Button
              disabled={isPending}
              type="button"
              variant={"outline"}
              className="w-32 border-green-700"
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
          <div className="w-full">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bio*</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="typeOfUser"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type of user*</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOfUserList.map((type) => (
                        <SelectItem value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex gap-x-6">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Your company"
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
                name="companyCountry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Location</FormLabel>
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
          <div className="w-1/2 pr-3">
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Website URL"
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
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Website 1"
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
                name="website2"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel></FormLabel> */}
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Website 2"
                      />
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
                    {/* <FormLabel></FormLabel> */}
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Website 3"
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
                name="website4"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel></FormLabel> */}
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Website 4"
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
              name="website5"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Website 5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-between mt-4">
            <Button
              disabled={isPending}
              type="button"
              variant={"outline"}
              className="w-64 flex gap-x-4 border-red-700"
              onClick={onBackClicked}
            >
              <FaArrowLeft />
              Back
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="w-64 flex gap-x-4"
            >
              <FaArrowRight />
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
