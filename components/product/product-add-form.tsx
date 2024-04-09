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
import { Textarea } from "../ui/textarea";
import { FaFileUpload, FaPlus } from "react-icons/fa";

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
    <Card className="w-full flex rounded-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="text-4xl font-medium">Add a new Product</CardTitle>
            <CardDescription>You can register your product and our admin users will check it and publish soon!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <FormLabel>
              Upload your creative work
            </FormLabel>
            <Button variant="outline" type="button" className="h-24 flex gap-x-2 border-green-700">
              <FaFileUpload />
              Browse Files
            </Button>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description for Product</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Product Description..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price for Product</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Product Price"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="self-end">
            <Button type="submit" className="w-48 flex gap-x-2">
              <FaPlus />
              Add
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Card className="w-1/2 m-4">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>You can preview your creative works</CardDescription>
        </CardHeader>
      </Card>
    </Card>
  )
}