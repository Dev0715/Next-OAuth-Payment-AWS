"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewProductSchema } from "@/schemas/product";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { createProduct, deleteProduct } from "@/data/product";
import { addNewProduct } from "@/actions/user/new-product";
import type { Product, ProductType } from "@/shared/types/product.type";
import { PreviewCard } from "./preview-card";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { deleteProductFromCreator } from "@/actions/user/delete-product";
import { ProductHistory } from "./product-history";
import { FilesCard } from "./files-card";
import { DetailsCard } from "./details-card";
import { updateProduct } from "@/actions/product/update-product";

export const ProductEditForm = ({ product }: { product: Product }) => {
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
      productType: product.productType,
      title: product.title,
      description: product.description,
      price: product.price
    }
  });

  useEffect(() => {
    setSelectedKeywords(product.keywords);
    setCreativeFiles(product.fileList);
    setPreviewFiles(product.previewList);
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

    try {
      const response = await axiosClient.post(
        "/multi-upload",
        formData,
        axiosConfig
      );
      return response.data.pathList;
    } catch (error) {
      return [];
    }
  };

  return (
    <Card className="w-full rounded-none">
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
            <FilesCard
              isPending={isPending}
              creativeFiles={creativeFiles}
              setCreativeFiles={setCreativeFiles}
            />
            <PreviewCard
              isPending={isPending}
              previewFiles={previewFiles}
              setPreviewFiles={setPreviewFiles}
            />
          </div>
          <div className="w-1/2 flex">
            <DetailsCard
              isPending={isPending}
              form={form}
              selectedKeywords={selectedKeywords}
              setSelectedKeywords={setSelectedKeywords}
              onSubmit={onSubmit}
              error={error}
              success={success}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
