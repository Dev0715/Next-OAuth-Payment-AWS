"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState, useRef } from "react";
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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { JOB_TITLES } from "@/shared/constants/user.constant";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  userData: SignedUpData;
  setUserData: Dispatch<SetStateAction<SignedUpData>>;
  moveStepForward: () => void;
  moveStepBackward: () => void;
};

export const CreatorDetailsForm = ({
  userData,
  setUserData,
  moveStepForward,
  moveStepBackward
}: Props) => {
  const defaultData = userData.creatorDetails;

  const [cover, setCover] = useState<File | undefined>(defaultData.cover);
  const [coverImagePath, setCoverImagePath] = useState<string>(
    defaultData.cover ? URL.createObjectURL(defaultData.cover) : ""
  );

  const hiddenCoverFileIniput = useRef<HTMLInputElement>(null);
  const onCoverChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImagePath(URL.createObjectURL(e.target.files[0]));
      setCover(e?.target?.files?.[0]);
    }
  };

  const form = useForm<z.infer<typeof CreatorDetailsSchema>>({
    resolver: zodResolver(CreatorDetailsSchema),
    defaultValues: {
      ...defaultData
    }
  });

  const onSubmit = (values: z.infer<typeof CreatorDetailsSchema>) => {
    setUserData({
      ...userData,
      creatorDetails: {
        ...values,
        cover
      }
    });
    moveStepForward();
  };

  const onBackClicked = () => {
    setUserData({
      ...userData,
      creatorDetails: {
        ...form.getValues(),
        cover
      }
    });
    moveStepBackward();
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-xl text-green-700">
        3. Please provide your KRE8TOR details.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6"
        >
          <div className="flex flex-col gap-y-4">
            <FormLabel>Cover Image</FormLabel>
            <Avatar className="w-full h-28 rounded-sm">
              <AvatarImage src={coverImagePath} className="object-cover" />
              <AvatarFallback className="bg-sky-400 rounded-sm">
                <div className="w-full h-full bg-inherit"></div>
              </AvatarFallback>
            </Avatar>
            <Button
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
          <div className="w-full">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type of user*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JOB_TITLES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" />
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
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your company" />
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
                      <Input {...field} placeholder="Country" />
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
                    <Input {...field} placeholder="Website URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-between mt-4">
            <Button
              type="button"
              variant={"outline"}
              className="w-64 flex gap-x-4 border-red-700"
              onClick={onBackClicked}
            >
              <FaArrowLeft />
              Back
            </Button>
            <Button type="submit" className="w-64 flex gap-x-4">
              <FaArrowRight />
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
