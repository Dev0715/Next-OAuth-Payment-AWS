"use client";

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewProductSchema } from "@/schemas/product"
import { useRef, useState, useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import { ImagePreview } from "./image-preview";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export const ProductAddForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [files, setFiles] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>();
  const [isPreviewing, setPreviewing] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onFileBrowse = () => {
    hiddenFileInput.current?.click();
  }

  const onFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).
        filter(newFile => !files.find(
          savedFile => savedFile.name === newFile.name && savedFile.size === newFile.size && savedFile.lastModified === newFile.lastModified
        ));
      setFiles(prev => [...prev, ...newFiles]);
    }
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  }

  const onPreviewFile = (index: number) => {
    setPreviewing(true);
    setPreviewIndex(index);
  }

  const onDeleteFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  }

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
      const formData = new FormData();
      files.forEach(file => {
        formData.append(uuidv4(), file);
      })
      formData.append("product", JSON.stringify(values));

      axiosClient.post("/new-product", formData, axiosConfig)
        .then(res => res.data).then(data => {
          console.log(data);
        })
    })
  }

  return (
    <Card className="w-full flex rounded-none">
      {/** Preview is not working with images whose width < height  */}
      <Dialog open={isPreviewing} onOpenChange={isOpen => setPreviewing(isOpen)}>
        <DialogContent className="max-w-[90%] max-h-[90%]">
          {/* <DialogHeader>
            <DialogTitle>{files[previewIndex as number]?.name}</DialogTitle>
          </DialogHeader> */}
          <div className="max-w-full max-h-full w-fit h-fit overflow-hidden">
            {isPreviewing && <img src={URL.createObjectURL(files[previewIndex as number])} className="max-w-full max-h-full object-fill" />}
          </div>
        </DialogContent>
      </Dialog>
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
            <div className="w-full">
              <Button onClick={onFileBrowse} variant="outline" type="button" className="w-full h-24 flex gap-x-2 border-green-700">
                <FaFileUpload />
                Add Files
              </Button>
              <Input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                ref={hiddenFileInput}
                onChange={onFileAdded}
              />
            </div>
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
                      onChange={event => field.onChange(+event.target.value)}
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
              Register
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Card className="w-1/2 m-4">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>You can preview your creative works</CardDescription>
        </CardHeader>
        <CardContent className="h-[560px]">
          <div className="h-full overflow-y-auto">
            <div className="flex flex-row flex-wrap gap-4">
              {files.map((file, index) => (
                <ImagePreview
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  onPreview={() => onPreviewFile(index)}
                  onDelete={() => onDeleteFile(index)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  )
}