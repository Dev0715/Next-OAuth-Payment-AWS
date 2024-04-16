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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaFileUpload, FaPlus } from "react-icons/fa";
import { ImagePreview } from "./image-preview";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";
import { PRODCUT_TYPES } from "@/shared/product-info";

export const ProductAddForm = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isTransactionPending, startTransition] = useTransition();
  const [isPending, setPending] = useState<boolean>(false);

  const [files, setFiles] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>();
  const [isPreviewing, setPreviewing] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [newKeywordVal, setNewKeywordVal] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const onAddNewKeyword = () => {
    setSelectedKeywords(prev => [...prev, newKeywordVal]);
  }

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
      productType: '',
      title: '',
      description: '',
      price: 0
    }
  });

  const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setPending(true);

      const formData = new FormData();
      files.forEach(file => {
        formData.append(uuidv4(), file);
      })
      formData.append("product", JSON.stringify(values));
      formData.append("userId", user?.id as string);

      axiosClient.post("/new-product", formData, axiosConfig)
        .then(res => res.data).then(data => {
          if (data.success) {
            setSuccess("Your product was registered successfully");
          } else {
            setError(data?.error); // # Need to be clear message #
          }
          setPending(false);
        }).catch(error => {
          setError("Internal Server Error"); // # Need to be clear message #
          setPending(false);
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
              <Button disabled={isPending} onClick={onFileBrowse} variant="outline" type="button" className="w-full h-24 flex gap-x-2 border-green-700">
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
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODCUT_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  You select from your original tags or add new one
                </CardDescription>
                <div className="flex justify-between gap-x-4 pt-2">
                  <div className="w-1/2 flex">
                    <Input
                      type="text"
                      value={newKeywordVal}
                      onChange={(e) => setNewKeywordVal(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="flex gap-x-2 text-sm"
                      onClick={onAddNewKeyword}
                    >
                      <FaPlus />
                      Add a new Tag
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {selectedTags.map((tag, index) => (
                  <Badge
                    key={tag}
                    className="h-8 flex gap-x-2 px-4 rounded-full"
                  >
                    <p>{tag}</p>
                    <Button
                      asChild
                      variant="link"
                      className="p-0 text-base text-black cursor-pointer"
                      onClick={() => onDeleteTag(index)}
                    >
                      <MdClose />
                    </Button>
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <FormError message={error} />
            <FormSuccess message={success} />
          </CardContent>
          <CardFooter className="self-end">
            <Button disabled={isPending} type="submit" className="w-48 flex gap-x-2">
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
                  disabled={isPending}
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