import { PasswordChangeSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaKey } from "react-icons/fa";

export const PasswordChangeForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordChangeSchema>>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (values: z.infer<typeof PasswordChangeSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {

    });
  };

  return (
    <Card className="w-1/2 h-fit rounded-none">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>It's recommended to update your password regularly for security</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          <CardContent className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
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
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
          </CardContent>
          <CardFooter className="self-end">
            <Button type="submit" variant="default" className="w-64 gap-x-2">
              <FaKey />
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}