"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CryptoPrefSchema } from "@/schemas/user";

import { GradientButton } from "../utils/gradient-button";

export const CryptoPrefForm = () => {
  const [, setError] = useState<string | undefined>("");
  const [, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CryptoPrefSchema>>({
    resolver: zodResolver(CryptoPrefSchema),
    defaultValues: {
      bitcoin: "",
      ethereum: "",
      litecoin: "",
      dogecoin: "",
      xrp: "",
      sol: "",
      usdcoin: "",
      avax: "",
      tron: ""
    }
  });

  const onSubmit = (values: z.infer<typeof CryptoPrefSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      console.log(values);
    });
  };

  return (
    <Card className="w-full h-fit flex flex-col rounded-none">
      <CardHeader>
        <CardTitle>Crypto Pref</CardTitle>
        <CardDescription>You can select your crypto preference</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <CardContent className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="bitcoin"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Bitcoin</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ethereum"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Ethereum</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="litecoin"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Litecoin</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dogecoin"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Dogecoin</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="xrp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>XRP</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sol"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>SOL</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usdcoin"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>USDcoin</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avax"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Avax</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tron"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Tron</FormLabel>
                    <FormControl className="w-5/6">
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </form>
      </Form>
      <CardFooter className="self-end">
        <GradientButton className="w-64 flex gap-x-2">Update</GradientButton>
      </CardFooter>
    </Card>
  );
};
