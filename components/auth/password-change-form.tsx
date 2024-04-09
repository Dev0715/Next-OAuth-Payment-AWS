import { PasswordChangeSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

export const PasswordChangeForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>It's recommended to update your password regularly for security</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent>

          </CardContent>
          <CardFooter>
            <Button type="submit" variant="default">Change Password</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}