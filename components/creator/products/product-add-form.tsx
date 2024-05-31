"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSave, FaUpload } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { newProduct } from "@/actions/product/new-product";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { GradientButton } from "@/components/utils/gradient-button";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

import { axiosClient, axiosConfig } from "@/lib/axios";
import { NewProductSchema } from "@/schemas/product";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { userAtom } from "@/store/user";

import { FormError } from "../../utils/form-error";
import { FormSuccess } from "../../utils/form-success";

import { DetailsCard } from "./details-card";
import { FilesCard } from "./files-card";
import { PreviewCard } from "./preview-card";

import type { Product, ProductState } from "@/shared/types/product.type";

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

  const onSubmit = (action: ProductState) => {
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

    submitProduct(action);
  };

  const submitProduct = async (action: ProductState) => {
    const [pathList, previewList] = await Promise.all([
      getPathList(creativeFiles as File[]),
      getPathList(previewFiles as File[])
    ]);

    if (pathList.length === 0 || previewList.length === 0) {
      setError("Error uploading files");
      return;
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
        state: action,
        history: [
          {
            state: action,
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
        <div className="flex flex-col font-firs">
          <CardTitle>
            <GradientParagraph className="text-2xl font-semibold">
              Add a new Product
            </GradientParagraph>
          </CardTitle>
          <CardDescription>
            You can register your product and our admin users will check it and
            publish soon!
          </CardDescription>
        </div>
        <div className="flex gap-x-6 items-end">
          <GradientButton
            disabled={isPending}
            className="w-64 gap-x-4 rounded-none border-green-700"
            onClick={form.handleSubmit(() => onSubmit("created"))}
          >
            <FaSave />
            Save
          </GradientButton>
          <GradientButton
            disabled={isPending}
            className="w-64 gap-x-4 rounded-none"
            onClick={form.handleSubmit(() => onSubmit("submitted"))}
          >
            <FaUpload />
            Direct Submit
          </GradientButton>
        </div>
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
