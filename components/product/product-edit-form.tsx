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
import { Button } from "../ui/button";
import { FaUpload } from "react-icons/fa";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";
import { useRouter } from "next/navigation";

export const ProductEditForm = ({ product }: { product: Product }) => {
  const history = useRouter();
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
      productType: form.getValues("productType"),
      productId: uuidv4(),
      ownerId: user?.userId as string,
      title: form.getValues("title"),
      description: form.getValues("description"),
      price: form.getValues("price"),
      fileList,
      previewList,
      keywords: selectedKeywords,
      approval: {
        state: "updated",
        history: [
          ...product.approval.history,
          {
            state: "updated",
            comment: form.getValues("submitComment"),
            userId: user?.userId as string,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;
    updateProduct(updatedProduct, product).then((res) => {
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
    <div className="w-full">
      <CardHeader className="w-full flex flex-row items-end justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-4xl font-medium">Edit a Product</CardTitle>
          <CardDescription>
            You can edit your product and our admin users will check it and
            publish soon!
          </CardDescription>
        </div>
        <Button
          disabled={isPending}
          className="w-64 gap-x-4 rounded-none"
          onClick={form.handleSubmit(onSubmit)}
        >
          <FaUpload />
          Resubmit
        </Button>
      </CardHeader>
      <div className="px-6 pb-6">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <CardContent className="flex flex-col gap-y-8">
        <Card className="w-full p-6 flex flex-col gap-y-4">
          <p className="text-xl font-semibold">Product Approval Status</p>
          <ProductHistory history={product.approval.history} />
        </Card>
        <div className="w-full flex gap-x-8">
          <div className="w-1/2 flex flex-col gap-y-8">
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
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
};
