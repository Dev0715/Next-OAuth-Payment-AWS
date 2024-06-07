"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { GradientButton } from "@/components/utils/gradient-button";
import { w9DetailsSchema } from "@/schemas/auth/register";
import {
  TAX_CLASSIFICATIONS,
  US_STATES
} from "@/shared/constants/user.constant";

import { userAtom } from "@/store/user";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  onUpdate: (data: Partial<SignedUpData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const W9Form = ({ onUpdate, onNext, onBack }: Props) => {
  const [user] = useAtom(userAtom);

  const form = useForm<z.infer<typeof w9DetailsSchema>>({
    resolver: zodResolver(w9DetailsSchema),
    defaultValues: {
      firstName: user?.firstname,
      lastName: user?.lastname
    }
  });

  const onSubmit = (values: z.infer<typeof w9DetailsSchema>) => {
    onUpdate({ w9Details: values });
    onNext();
  };

  const handleBackClicked = () => {
    onBack();
  };

  return (
    <div className="w-full">
      <p className="t-body -size-m mb-8">
        We can only accept letters, numbers and special characters &amp; - , / #
        ( ) . Please use the English equivalent of accented characters, eg. a
        for à.
      </p>

      <Form {...form}>
        <form
          className="w-full grid grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="col-span-2 text-center" style={{ color: "grey" }}>
            Must match name as shown on your income tax return
          </p>
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Business Name/Disregarded Name (if different from above name)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Business Name/Disregarded Name (if different from above name)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxClassification"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Tax Classification*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tax classification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TAX_CLASSIFICATIONS.map((type) => (
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
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>City / Town*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="City / Town" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>State / Province*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="State / Province*" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {US_STATES.map((type) => (
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
            name="zip"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>ZIP / Post Code*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ZIP / Post Code*" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumbers"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>List account numbers here</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="List account numbers here" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxIdType"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Tax ID Type*</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="w-full flex flex-col"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ssn" />
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        U.S. Social Security Number (SSN)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ein" />
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        U.S. Employer Identification Number (EIN)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxIdNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Tax ID Number*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tax ID Number*" />
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
