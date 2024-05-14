"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewProductSchema } from "@/schemas/product";
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectValue
} from "@/components/ui/select";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";
import { createProduct } from "@/data/product";
import { addNewProduct } from "@/actions/user/new-product";
import { PRODUCT_TYPE_DISPLAY_TEXT } from "@/shared/constants/product.constant";

import type { Product, ProductType } from "@/shared/types/product.type";
import { PreviewCard } from "./preview-card";
import { PreviewDialog } from "./preview-dialog";
import { FilesCard } from "./files-card";
import { DetailsCard } from "./details-card";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { newProduct } from "@/actions/product/new-product";

export const ProductAddForm = () => {
  const [user] = useAtom(userAtom);

  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [previewFiles, setPreviewFiles] = useState<FileOrString[]>([]);
  const [creativeFiles, setCreativeFiles] = useState<FileOrCreativeFile[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      productType: "",
      title: "",
      description: "",
      price: 0
    }
  });

  const onSubmit = () => {
    if (creativeFiles.length === 0 || previewFiles.length === 0) {
      setSuccess("");
      setError(
        "Please upload at least one creative file and one preview image"
      );
      return;
    }

    setError("");
    setSuccess("");
    setPending(true);

    submitProduct()
      .then(() => {
        setSuccess("Product registered successfully!");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full rounded-none">
      {/** Preview is not working with images whose width < height  */}
      <PreviewDialog
        isPreviewing={isPreviewing}
        setPreviewing={setPreviewing}
        image={previewFiles[previewIndex as number]}
      />
      <CardHeader>
        <CardTitle className="text-4xl font-medium">
          Add a new Product
        </CardTitle>
        <CardDescription>
          You can register your product and our admin users will check it and
          publish soon!
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-6">
        <div className="">
          <Card className="mb-6 w-full">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Creative Works</CardTitle>
              <Button
                type="button"
                className="gap-x-2 border-green-700"
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={onCreativeFileBrowse}
              >
                <FaFileUpload />
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              <div className="min-h-32 flex flex-wrap gap-4">
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
                {creativeFiles.length === 0 && (
                  <div className="w-full flex items-center justify-center">
                    <p>No Creative Files selected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <PreviewCard
            previewFiles={previewFiles}
            isPending={isPending}
            onPreviewFileBrowse={onPreviewFileBrowse}
            onPreviewFile={onPreviewFile}
            onDeletePreviewFile={onDeletePreviewFile}
          />
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(PRODUCT_TYPE_DISPLAY_TEXT).map(
                        ([productType, text]) => (
                          <SelectItem key={productType} value={productType}>
                            {text}
                          </SelectItem>
                        )
                      )}
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
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormDescription>
                You can set as many keywords as you want to improve chance of
                your product to be found out
              </FormDescription>
              <div className="w-full grid grid-cols-[1fr_auto] gap-4">
                <Input
                  disabled={isPending}
                  className=""
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
                  Add
                </Button>

                <div className="flex flex-wrap gap-2 col-span-2">
                  {selectedKeywords.map((keyword, index) => (
                    <Badge
                      key={keyword}
                      className="h-8 flex gap-x-2 px-2 rounded-full"
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
                </div>
              </div>
            </FormItem>
            <div className="w-full flex gap-x-4">
              <Input
                className="hidden"
                type="file"
                // accept="image/*"
                multiple
                ref={hiddenCreativeFileInput}
                onChange={onCreativeFileAdded}
              />
              <Input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                ref={hiddenPreviewInput}
                onChange={onPreviewFileAdded}
              />
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full gap-x-2"
            >
              <FaPlus />
              Register
            </Button>
            <FormError message={error} />
            <FormSuccess message={success} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
