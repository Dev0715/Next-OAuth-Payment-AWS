"use client";

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewProductSchema } from "@/schemas/product"
import { useState, useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const ProductAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0
    }
  });

  const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {

    })
  }

  return (
    <Card className="rounded-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Add a new Product</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title for Product</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Product Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              Register
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}