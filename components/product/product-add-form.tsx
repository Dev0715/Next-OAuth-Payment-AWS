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
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import type { Product } from "@/shared/types/product.type";
import { PreviewCard } from "./preview-card";
import { FilesCard } from "./files-card";
import { DetailsCard } from "./details-card";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { newProduct } from "@/actions/product/new-product";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaUpload } from "react-icons/fa";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";

export const ProductAddForm = () => {
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

    submitProduct();
  };

  const submitProduct = async () => {
    const [pathList, previewList] = await Promise.all([
      getPathList(creativeFiles as File[]),
      getPathList(previewFiles as File[])
    ]);

    if (pathList.length === 0 || previewList.length === 0) {
      throw new Error("Failed to upload images.");
    }

    const fileList = pathList.map((path: string, index: number) => ({
      name: creativeFiles[index].name,
      path
    }));

    const _product = {
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
        state: "created",
        history: [
          {
            state: "created",
            comment: form.getValues("submitComment"),
            userId: user?.userId as string,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;
    newProduct(_product).then((res) => {
      setSuccess(res.success || "");
      setError(res.error || "");

      if (res.success) {
        setTimeout(() => {
          history.replace(`/creator/${user?.userId as string}`);
        }, 1000);
      } else {
        setPending(false);
      }
    });
  };

  const getPathList = async (fileList: File[]) => {
    const formData = new FormData();
    formData.append("username", user?.username as string);
    fileList.forEach((file) => {
      formData.append(uuidv4(), file);
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
          <CardTitle className="text-2xl font-medium">
            Add a new Product
          </CardTitle>
          <CardDescription>
            You can register your product and our admin users will check it and
            publish soon!
          </CardDescription>
        </div>
        <Button
          disabled={isPending}
          className="w-64 gap-x-4 rounded-none"
          onClick={form.handleSubmit(onSubmit)}
        >
          <FaUpload />
          Submit
        </Button>
      </CardHeader>
      <div className="px-6 pb-6">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <CardContent className="w-full flex gap-x-8">
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
      </CardContent>
    </div>
  );
};
