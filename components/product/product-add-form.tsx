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
      ...form.getValues(),
      productId: uuidv4(),
      ownerId: user?.userId as string,
      fileList,
      previewList,
      keywords: selectedKeywords,
      approval: {
        state: "created",
        history: [
          {
            state: "created",
            comment: "Newly created and deployed, waiting for approval.",
            userId: user?.userId as string
          }
        ]
      }
    } as Product;
    newProduct(_product).then((res) => {
      setSuccess(res.success || "");
      setError(res.error || "");
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
    <Card className="w-full rounded-none">
      <CardHeader>
        <CardTitle className="text-4xl font-medium">
          Add a new Product
        </CardTitle>
        <CardDescription>
          You can register your product and our admin users will check it and
          publish soon!
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex gap-x-6">
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
      </CardContent>
    </Card>
  );
};
