"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { GradientButton } from "@/components/utils/gradient-button";
import { W8CorporationDetailsSchema } from "@/schemas/auth/register";
import { CHAPTER3STATUS, COUNTRIES } from "@/shared/constants/user.constant";

import type { SignedUpData } from "@/shared/types/signup-data.type";

type Props = {
  onUpdate: (data: Partial<SignedUpData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const W8CorporationForm = ({ onNext, onBack }: Props) => {
  const [mailing, setMailing] = useState(true);

  const form = useForm<z.infer<typeof W8CorporationDetailsSchema>>({
    resolver: zodResolver(W8CorporationDetailsSchema)
  });

  const onSubmit = (values: z.infer<typeof W8CorporationDetailsSchema>) => {
    console.log(values);
    onNext();
  };

  const handleBackClicked = () => {
    onBack();
  };

  return (
    <div className="w-full mt-8">
      <p className="mb-8">
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
            name="organizationName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Name of Organization that is the Beneficial Owner*
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryIncorporation"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country of Incorporation*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((item) => (
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

          <p className="col-span-2" style={{ color: "grey" }}>
            Must match name as shown on your income tax return
          </p>

          <FormField
            control={form.control}
            name="entityName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name of Disregarded Entity</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name of Disregarded Entity" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chapter3Status"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Chapter 3 Status*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a chapter 3 status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CHAPTER3STATUS.map((item) => (
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

          <FormField
            control={form.control}
            name="residenceAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Permanent Residence Address*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Permanent Residence Address" />
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
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="State / Province" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>ZIP / Post Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ZIP / Post Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryResidence"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country of Residence*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((item) => (
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

          <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={mailing}
                onCheckedChange={(value: boolean) => setMailing(value)}
              />
            </FormControl>
            <FormLabel>
              Tax ID Type* Mailing address is the same as above
            </FormLabel>
          </FormItem>

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
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value="tin" id="tin" />
                      <Label htmlFor="tin" className="cursor-pointer">
                        TIN (US Taxpayer Identification Number)
                      </Label>
                    </div>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value="giin" id="giin" />
                      <Label htmlFor="giin" className="cursor-pointer">
                        GIIN (Global Intermediary Identification Number)
                      </Label>
                    </div>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value="FOREIGN" id="FOREIGN" />
                      <Label htmlFor="FOREIGN" className="cursor-pointer">
                        Foreign Tax ID Number
                      </Label>
                    </div>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value="NOT" id="NOT" />
                      <Label htmlFor="NOT" className="cursor-pointer">
                        I will not or am unable to provide a Tax ID Number
                      </Label>
                    </div>
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
