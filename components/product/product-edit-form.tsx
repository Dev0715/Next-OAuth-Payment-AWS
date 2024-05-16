"use client";

import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import type { Product } from "@/shared/types/product.type";
import { PreviewCard } from "./preview-card";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
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
  }, [product]);

  const onSubmit = () => {
    if (creativeFiles.length === 0 || previewFiles.length === 0) {
      setSuccess("");
      setError("creative files and one preview images can't be empty!");
      return;
    }
    setSuccess("");
    setError("");
    setPending(true);

    submitProduct();
  };

  const submitProduct = async () => {
    const [_pathList, _previewList] = await Promise.all([
      getPathList(creativeFiles),
      getPathList(previewFiles)
    ]);

    const _creativeFiles = creativeFiles.filter((item) => item instanceof File);
    const _fileList = _pathList.map((path: string, index: number) => ({
      name: _creativeFiles[index].name,
      path
    }));

    const fileList = [
      ...creativeFiles.filter((item) => !(item instanceof File)),
      ..._fileList
    ];
    const previewList = [
      ...previewFiles.filter((item) => !(item instanceof File)),
      ..._previewList
    ];

    if (previewList.length === 0 || fileList.length === 0) {
      throw new Error("Failed to upload images.");
    }

    const updatedProduct = {
      ...form.getValues(),
      productId: uuidv4(),
      ownerId: user?.userId as string,
      fileList,
      previewList,
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
    } as Product;
    updateProduct(updatedProduct).then((res) => {
      setSuccess(res.success || "");
      setError(res.error || "");
    });
  };

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
