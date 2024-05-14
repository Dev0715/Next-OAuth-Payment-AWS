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
import { useEffect, useRef, useState } from "react";
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
import { FaFileUpload, FaPlus, FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";
import { createProduct, deleteProduct } from "@/data/product";
import { addNewProduct } from "@/actions/user/new-product";
import { PRODUCT_TYPE_DISPLAY_TEXT } from "@/shared/constants/product.constant";

import type { Product, ProductType } from "@/shared/types/product.type";
import { PreviewCard } from "./preview-card";
import { PreviewDialog } from "./preview-dialog";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { deleteProductFromCreator } from "@/actions/user/delete-product";
import { ProductHistory } from "./product-history";

export const ProductEditForm = ({ product }: { product: Product }) => {
  const [user] = useAtom(userAtom);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setPending] = useState<boolean>(false);

  const [previewFiles, setPreviewFiles] = useState<FileOrString[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number>();
  const [isPreviewing, setPreviewing] = useState<boolean>(false);
  const hiddenPreviewInput = useRef<HTMLInputElement>(null);

  const [creativeFiles, setCreativeFiles] = useState<FileOrCreativeFile[]>([]);
  const hiddenCreativeFileInput = useRef<HTMLInputElement>(null);

  const [newKeywordVal, setNewKeywordVal] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeywords(product.keywords);
    setCreativeFiles(product.fileList);
    // Promise.all(
    //   product.previewList.map(async (path) => {
    //     const res = await getLinkFromS3(path);
    //     if (res.success) {
    //       return res.response;
    //     }
    //   })
    // ).then((response) => {
    //   setPreviewFiles(response as FileOrString[]);
    // });
    setPreviewFiles(product.previewList);
  }, [product]);

  const onAddNewKeyword = () => {
    if (newKeywordVal === "") return;

    const existingOne = selectedKeywords.find(
      (keyword) => keyword === newKeywordVal
    );
    if (!existingOne) setSelectedKeywords((prev) => [...prev, newKeywordVal]);

    setNewKeywordVal("");
  };

  const onDeleteKeyword = (index: number) => {
    const newKeywords = [...selectedKeywords];
    newKeywords.splice(index, 1);
    setSelectedKeywords(newKeywords); // # Show Duplication Error? #
  };

  const onCreativeFileBrowse = () => {
    hiddenCreativeFileInput.current?.click();
  };

  const onCreativeFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).filter(
        (newFile) =>
          !creativeFiles.find(
            (savedFile) =>
              savedFile instanceof File &&
              savedFile.name === newFile.name &&
              savedFile.size === newFile.size &&
              savedFile.lastModified === newFile.lastModified
          )
      );
      setCreativeFiles((prev) => [...prev, ...newFiles]);
    }
    if (hiddenCreativeFileInput.current) {
      hiddenCreativeFileInput.current.value = "";
    }
  };

  const onDeleteCreativeFile = (index: number) => {
    const updatedFiles = [...creativeFiles];
    updatedFiles.splice(index, 1);
    setCreativeFiles(updatedFiles);
  };

  const onPreviewFileBrowse = () => {
    hiddenPreviewInput.current?.click();
  };

  const onPreviewFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = Array.from(event.target.files).filter(
        (newFile) =>
          !previewFiles.find(
            (savedFile) =>
              savedFile instanceof File &&
              savedFile.name === newFile.name &&
              savedFile.size === newFile.size &&
              savedFile.lastModified === newFile.lastModified
          )
      );
      setPreviewFiles((prev) => [...prev, ...newFiles]);
    }
    if (hiddenPreviewInput.current) {
      hiddenPreviewInput.current.value = "";
    }
  };

  const onPreviewFile = (index: number) => {
    setPreviewing(true);
    setPreviewIndex(index);
  };

  const onDeletePreviewFile = (index: number) => {
    const updatedFiles = [...previewFiles];
    updatedFiles.splice(index, 1);
    setPreviewFiles(updatedFiles);
  };

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      productType: product.productType,
      title: product.title,
      description: product.description,
      price: product.price
    }
  });

  const getPathList = async (
    fileList: FileOrString[] | FileOrCreativeFile[]
  ) => {
    const formData = new FormData();
    formData.append("username", user?.username as string);
    fileList.forEach((file) => {
      if (file instanceof File) formData.append(uuidv4(), file);
    });

    const response = await axiosClient.post(
      "/multi-upload",
      formData,
      axiosConfig
    );
    const data = response.data;

    if (data.success) {
      return data.pathList;
    } else {
      return [];
    }
  };

  const submitProduct = async () => {
    try {
      const [_pathList, _previewList] = await Promise.all([
        getPathList(creativeFiles),
        getPathList(previewFiles)
      ]);

      const _creativeFiles = creativeFiles.filter(
        (item) => item instanceof File
      );

      const productType = form.getValues().productType as ProductType;
      const productId = uuidv4();
      const pathList = _pathList.map((path: string, index: number) => ({
        name: _creativeFiles[index].name,
        path
      }));

      const previewList = [
        ..._previewList,
        ...previewFiles.filter((item) => !(item instanceof File))
      ];

      const fileList = [
        ...pathList,
        ...creativeFiles.filter((item) => !(item instanceof File))
      ];

      if (previewList.length === 0 || fileList.length === 0) {
        throw new Error("Failed to upload images.");
      }

      const res = await createProduct({
        ...form.getValues(),
        productType,
        productId,
        ownerId: user?.userId as string,
        fileList,
        previewList: previewList,
        keywords: selectedKeywords,
        approval: {
          state: "updated",
          history: [
            ...product.approval.history,
            {
              state: "updated",
              comment: "Newly updated and deployed, waiting for approval.",
              userId: user?.userId as string
            }
          ]
        }
      });

      if (!res.success) {
        throw new Error("Failed to create product. Please try again.");
      }

      const response = await addNewProduct(user?.userId as string, {
        productType: form.getValues().productType as ProductType,
        productId
      });

      if (response.error) {
        throw new Error("Failed to save products into user information.");
      }

      const res_delete = await deleteProduct(
        product.productType,
        product.productId
      );

      if (!res_delete.success) {
        throw new Error("Failed to delete the old product.");
      }

      const response_delete = await deleteProductFromCreator(
        user?.userId as string,
        product.productId
      );

      if (response_delete.error) {
        throw new Error("Failed to delete the old product from creator.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  };

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
        setSuccess("Product updated successfully!");
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
        <CardTitle className="text-4xl font-medium">Edit a Product</CardTitle>
        <CardDescription>
          You can edit your product and our admin users will check it and
          publish soon!
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-xl font-semibold">Product History</p>
          <ProductHistory history={product.approval.history} />
        </div>

        <div className="w-full flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-x-6">
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
          <div className="w-1/2 flex">
            <Form {...form}>
              <form
                className="w-full space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormDescription>
                    You can set as many keywords as you want to improve chance
                    of your product to be found out
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
                  <FaSave />
                  Save
                </Button>
                <FormError message={error} />
                <FormSuccess message={success} />
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
