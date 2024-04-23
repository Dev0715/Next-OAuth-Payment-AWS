"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewProductSchema } from "@/schemas/product";
import { useRef, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
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
import { Dialog, DialogContent } from "../ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";
import { PRODCUT_TYPES } from "@/shared/product-types";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";
import { createProduct } from "@/data/products/product-create";
import { addNewProduct } from "@/actions/user/new-product";

export const ProductAddForm = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setPending] = useState<boolean>(false);

  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>();
  const [isPreviewing, setPreviewing] = useState<boolean>(false);
  const hiddenPreviewInput = useRef<HTMLInputElement>(null);

  const [creativeFiles, setCreativeFiles] = useState<File[]>([]);
  const hiddenCreativeFileInput = useRef<HTMLInputElement>(null);

  const [newKeywordVal, setNewKeywordVal] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const onAddNewKeyword = () => {
    if (newKeywordVal === '')
      return;

    const existingOne = selectedKeywords.find(keyword => keyword === newKeywordVal);
    if (!existingOne)
      setSelectedKeywords(prev => [...prev, newKeywordVal]);

    setNewKeywordVal("");
  }

  const onDeleteKeyword = (index: number) => {
    const newKeywords = [...selectedKeywords];
    newKeywords.splice(index, 1);
    setSelectedKeywords(newKeywords); // # Show Duplication Error? #
  }

  const onCreativeFileBrowse = () => {
    hiddenCreativeFileInput.current?.click();
  }

  const onCreativeFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).
        filter(newFile => !creativeFiles.find(
          savedFile => savedFile.name === newFile.name && savedFile.size === newFile.size && savedFile.lastModified === newFile.lastModified
        ));
      setCreativeFiles(prev => [...prev, ...newFiles]);
    }
    if (hiddenCreativeFileInput.current) {
      hiddenCreativeFileInput.current.value = '';
    }
  }

  const onDeleteCreativeFile = (index: number) => {
    const updatedFiles = [...creativeFiles];
    updatedFiles.splice(index, 1);
    setCreativeFiles(updatedFiles);
  }

  const onPreviewFileBrowse = () => {
    hiddenPreviewInput.current?.click();
  }

  const onPreviewFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).
        filter(newFile => !previewFiles.find(
          savedFile => savedFile.name === newFile.name && savedFile.size === newFile.size && savedFile.lastModified === newFile.lastModified
        ));
      setPreviewFiles(prev => [...prev, ...newFiles]);
    }
    if (hiddenPreviewInput.current) {
      hiddenPreviewInput.current.value = '';
    }
  }

  const onPreviewFile = (index: number) => {
    setPreviewing(true);
    setPreviewIndex(index);
  }

  const onDeletePreviewFile = (index: number) => {
    const updatedFiles = [...previewFiles];
    updatedFiles.splice(index, 1);
    setPreviewFiles(updatedFiles);
  }

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      productType: '',
      title: '',
      description: '',
      price: 0,
      keywords: []
    }
  });

  const getPathList = async (fileList: File[]) => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append(uuidv4(), file);
    });

    const response = await axiosClient.post("/multi-upload", formData, axiosConfig);
    const data = response.data;

    if (data.success) {
      return data.pathList;
    } else {
      throw new Error(data.error);
    }
  }

  const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
    setError("");
    setSuccess("");
    setPending(true);

    Promise.all([
      getPathList(creativeFiles),
      getPathList(previewFiles)
    ]).then(([pathList, previewList]) => {
      const productId = uuidv4();
      const fileList = pathList.map((path: string, index: number) => ({
        name: creativeFiles[index].name,
        path
      }));
      createProduct({
        ...values,
        productId,
        fileList,
        previewList,
        keywords: selectedKeywords,
        ownerId: user?.userId as string,
      }).then(res => {
        if (res.success) {
          addNewProduct(user?.userId as string, {
            productType: values.productType,
            productId
          }).then(res => {
            setSuccess(res.success);
            setError(res.error);
            setPending(false);
          }).catch(error => {
            setError("Internal Server Error");
            setPending(false);
          })
        } else {
          setError("Internal Sever Error");
          setPending(false);
        }
      }).catch(error => {
        setError("Internal Sever Error");
        setPending(false);
      })
    }).catch(error => {
      setError("Internal Sever Error");
      setPending(false);
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
            {isPreviewing && <img src={URL.createObjectURL(previewFiles[previewIndex as number])} className="max-w-full max-h-full object-fill" />}
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
            <div className="w-full flex gap-x-4">
              <div className="w-1/2">
                <Button disabled={isPending} onClick={onCreativeFileBrowse} variant="outline" type="button" className="w-full h-16 flex gap-x-2 border-green-700">
                  <FaFileUpload />
                  Upload your creative work
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  // accept="image/*"
                  multiple
                  ref={hiddenCreativeFileInput}
                  onChange={onCreativeFileAdded}
                />
              </div>
              <div className="w-1/2">
                <Button disabled={isPending} onClick={onPreviewFileBrowse} variant="outline" type="button" className="w-full h-16 flex gap-x-2 border-green-700">
                  <FaFileUpload />
                  Add images for preview
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  ref={hiddenPreviewInput}
                  onChange={onPreviewFileAdded}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
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
                <CardTitle>Keywords</CardTitle>
                <CardDescription>
                  You can set as many keywords as you want to improve chance of your product to be found out
                </CardDescription>
                <div className="w-full flex gap-x-4 pt-2">
                  <Input
                    disabled={isPending}
                    className="max-w-60"
                    type="text"
                    value={newKeywordVal}
                    onChange={(e) => setNewKeywordVal(e.target.value)}
                  />
                  <Button
                    disabled={isPending}
                    type="button"
                    variant="link"
                    className="flex gap-x-2 text-sm"
                    onClick={onAddNewKeyword}
                  >
                    <FaPlus />
                    Add a new Keyword
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {selectedKeywords.map((keyword, index) => (
                  <Badge
                    key={keyword}
                    className="h-8 flex gap-x-2 px-4 rounded-full"
                  >
                    <p>{keyword}</p>
                    <Button
                      // asChild
                      disabled={isPending}
                      variant="link"
                      className="p-0 text-base text-black cursor-pointer"
                      onClick={() => onDeleteKeyword(index)}
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
      <div className="w-1/2 flex flex-col gap-y-6 p-4 pt-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Creative Works</CardTitle>
            {/* <CardDescription>You can preview your creative works</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="flex flex-row flex-wrap gap-4">
              {creativeFiles.map((file, index) => (
                <Badge
                  key={index}
                  className="h-8 flex gap-x-2 px-4 rounded-full"
                >
                  <p>{file.name}</p>
                  <Button
                    // asChild
                    disabled={isPending}
                    variant="link"
                    className="p-0 text-base text-black cursor-pointer"
                    onClick={() => onDeleteCreativeFile(index)}
                  >
                    <MdClose />
                  </Button>
                </Badge>
              ))}
              {creativeFiles.length === 0 &&
                <div className="w-full h-64 flex items-center justify-center">
                  <p>
                    No Creative Files selected
                  </p>
                </div>
              }
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Preview Images</CardTitle>
            {/* <CardDescription>You can preview your creative works</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="flex flex-row flex-wrap gap-4">
              {previewFiles.map((file, index) => (
                <ImagePreview
                  key={file.name}
                  disabled={isPending}
                  src={URL.createObjectURL(file)}
                  onPreview={() => onPreviewFile(index)}
                  onDelete={() => onDeletePreviewFile(index)}
                />
              ))}
              {previewFiles.length === 0 &&
                <div className="w-full h-64 flex items-center justify-center">
                  <p>
                    No Preview Images selected
                  </p>
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}