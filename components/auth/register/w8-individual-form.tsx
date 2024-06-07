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
import { W8IndividualDetailsSchema } from "@/schemas/auth/register";

import { COUNTRIES } from "@/shared/constants/user.constant";

export const W8IndividualForm = () => {
  const form = useForm<z.infer<typeof W8IndividualDetailsSchema>>({
    resolver: zodResolver(W8IndividualDetailsSchema)
  });

  const onSubmit = (values: z.infer<typeof W8IndividualDetailsSchema>) => {
    console.log(values);
  };

  const handleBackClicked = () => {
    // onBack();
  };

  return (
    <div className="w-full mt-8">
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
            name="countryCitizenship"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country of Citizenship*</FormLabel>
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
                      <RadioGroupItem value={"SSN"} id={"SSN"} />
                      <Label
                        htmlFor={"U.S. Social Security Number (SSN)"}
                        className="flex items-center gap-x-4 text-5xl cursor-pointer"
                      >
                        <p className="text-lg">
                          U.S. Social Security Number (SSN)
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value={"EIN"} id={"EIN"} />
                      <Label
                        htmlFor={
                          "Individual Taxpayer Identification Number (ITIN)"
                        }
                        className="flex items-center gap-x-4 text-5xl cursor-pointer"
                      >
                        <p className="text-lg">
                          Individual Taxpayer Identification Number (ITIN)
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value={"FOREIGN"} id={"FOREIGN"} />
                      <Label
                        htmlFor={"Foreign Tax ID Number"}
                        className="flex items-center gap-x-4 text-5xl cursor-pointer"
                      >
                        <p className="text-lg">Foreign Tax ID Number</p>
                      </Label>
                    </div>
                    <div className="flex items-center gap-x-4 cursor-pointer">
                      <RadioGroupItem value={"NOT"} id={"NOT"} />
                      <Label
                        htmlFor={
                          "I will not or am unable to provide a Tax ID Number"
                        }
                        className="flex items-center gap-x-4 text-5xl cursor-pointer"
                      >
                        <p className="text-lg">
                          I will not or am unable to provide a Tax ID Number
                        </p>
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

          <FormField
            control={form.control}
            name="referenceNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Reference number(s)*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Reference number(s)*" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Date of Birth*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Date of Birth*" />
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
