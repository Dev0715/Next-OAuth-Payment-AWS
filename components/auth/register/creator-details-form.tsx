"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { GradientButton } from "@/components/utils/gradient-button";
import { CreatorDetailsSchema } from "@/schemas/auth/register";
import { JOB_TITLES } from "@/shared/constants/user.constant";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  data: SignedUpData["creatorDetails"];
  onUpdate: (data: Partial<SignedUpData>) => void;
  onBack: () => void;
};

export const CreatorDetailsForm = ({ data, onUpdate, onBack }: Props) => {
  const form = useForm<z.infer<typeof CreatorDetailsSchema>>({
    resolver: zodResolver(CreatorDetailsSchema),
    defaultValues: data
  });

  const onSubmit = (values: z.infer<typeof CreatorDetailsSchema>) => {
    onUpdate({
      creatorDetails: {
        ...values
        // cover
      }
    });
  };

  const handleBackClicked = () => {
    onUpdate({
      creatorDetails: form.getValues()
    });
    onBack();
  };

  return (
    <div className="w-full">
      <p className="mb-6 text-xl text-green-700">
        Please provide your KRE8TOR details.
      </p>
      <Form {...form}>
        <form
          className="w-full grid grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="companyWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Website</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Website URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full col-span-2 flex items-center justify-between mt-4">
            <GradientButton
              variant="destructive"
              className="flex gap-x-4 border-red-700"
              onClick={handleBackClicked}
            >
              <FaArrowLeft />
              Back
            </GradientButton>
            <GradientButton type="submit" className="flex gap-x-4">
              <FaArrowRight />
              Next
            </GradientButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
