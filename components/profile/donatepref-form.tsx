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
import { DonatePrefSchema } from "@/schemas/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";

export const DonatePrefForm = () => {
  const [, setError] = useState<string | undefined>("");
  const [, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DonatePrefSchema>>({
    resolver: zodResolver(DonatePrefSchema),
    defaultValues: {
      lfxmentorship: "",
      gofundme: "",
      kickstarter: "",
      indiegogo: "",
      githubsponsors: "",
      opencollective: "",
      tidelift: "",
      issuehunt: "",
      patreon: "",
      buymeacoffee: "",
      kofi: ""
    }
  });

  const onSubmit = (values: z.infer<typeof DonatePrefSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      console.log(values);
    });
  };

  return (
    <Card className="w-full h-fit flex flex-col rounded-none">
      <CardHeader>
        <CardTitle>Donate Pref</CardTitle>
        <CardDescription>You can select your Donate preference</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <CardContent className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="lfxmentorship"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>LFX Mentorship</FormLabel>
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
              name="gofundme"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>gofundme</FormLabel>
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
              name="kickstarter"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>kickstarter</FormLabel>
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
              name="indiegogo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>indiegogo</FormLabel>
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
              name="githubsponsors"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>githubsponsors</FormLabel>
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
              name="opencollective"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>opencollective</FormLabel>
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
              name="tidelift"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>tidelift</FormLabel>
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
              name="issuehunt"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>issuehunt</FormLabel>
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
              name="patreon"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>patreon</FormLabel>
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
              name="buymeacoffee"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>buymeacoffee</FormLabel>
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
              name="kofi"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>kofi</FormLabel>
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
        <Button className="w-64 flex gap-x-2">Update</Button>
      </CardFooter>
    </Card>
  );
};
