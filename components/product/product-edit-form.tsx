"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRecycle, FaSave, FaUpload } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { updateProduct } from "@/actions/product/update-product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { NewProductSchema } from "@/schemas/product";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { userAtom } from "@/store/user";

import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";

import { DetailsCard } from "./details-card";
import { FilesCard } from "./files-card";
import { PreviewCard } from "./preview-card";
import { ProductHistory } from "./product-history";

import type { Product, ProductState } from "@/shared/types/product.type";
import { deleteProduct } from "@/data/product";
import { QuestionAlert } from "../utils/question-alert";

type Props = {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export const ProductEditForm = ({ product, setProduct }: Props) => {
  const history = useRouter();
  const [user] = useAtom(userAtom);

  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [previewFiles, setPreviewFiles] = useState<FileOrString[]>([]);
  const [creativeFiles, setCreativeFiles] = useState<FileOrCreativeFile[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const isApproved = product.approval.state === "approved";

  const isEverSubmitted = useMemo(() => {
    return !!product.approval.history.find(
      (item) => item.state === "submitted" || item.state === "resubmitted"
    );
  }, [product]);

  const isResubmitted = useMemo(() => {
    return !!product.approval.history.find(
      (item) => item.state === "submitted"
    );
  }, [product]);

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

  const onSubmit = (action: ProductState) => {
    if (creativeFiles.length === 0 || previewFiles.length === 0) {
      setSuccess("");
      setError("creative files and one preview images can't be empty!");
      return;
    }
    setSuccess("");
    setError("");
    setPending(true);

    submitProduct(action);
  };

  const submitProduct = async (action: ProductState) => {
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
      productId: product.productId,
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
          ...product.approval.history,
          {
            state: action,
            comment: form.getValues("submitComment"),
            userId: user?.userId as string,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;
    updateProduct(updatedProduct).then((res) => {
      setSuccess(res.success || "");
      setError(res.error || "");

      if (res.success) {
        setProduct(updatedProduct);
      }
      setPending(false);
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

  const onDelete = () => {
    deleteProduct(product.productType, product.productId).then((res) => {
      if (res.success) {
        setSuccess("Product deleted successfully");
        setTimeout(() => {
          history.replace(`/creator/${user?.userId}`);
        }, 1000);
      }
    });
  };

  const onPublish = () => {};

  return (
    <div className="w-full">
      <CardHeader className="w-full flex flex-row items-end justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-medium">Edit a Product</CardTitle>
          <CardDescription>
            You can edit your product and our admin users will check it and
            publish soon!
          </CardDescription>
        </div>
        <div className="flex gap-x-6 items-end">
          <Button
            disabled={isPending}
            variant={"outline"}
            className="w-64 gap-x-4 rounded-none border-green-700"
            onClick={form.handleSubmit(() => onSubmit("updated"))}
          >
            <FaSave />
            Update Product
          </Button>

          {isApproved ? (
            <Button
              disabled={isPending}
              className="w-64 gap-x-4 rounded-none"
              onClick={onPublish}
            >
              <FaUpload />
              Publish
            </Button>
          ) : (
            <Button
              disabled={isPending}
              className="w-64 gap-x-4 rounded-none"
              onClick={form.handleSubmit(() =>
                onSubmit(isResubmitted ? "resubmitted" : "submitted")
              )}
            >
              <FaUpload />
              {isResubmitted ? "Resubmit" : "Submit"}
            </Button>
          )}

          {!isEverSubmitted && (
            <QuestionAlert
              title="Confirmation"
              message="Are you sure want to delete this item?"
              onContinue={onDelete}
            >
              <Button
                disabled={isPending}
                variant={"destructive"}
                className="w-64 gap-x-4 rounded-none border-green-700"
              >
                <FaRecycle />
                Delete Product
              </Button>
            </QuestionAlert>
          )}
        </div>
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
              isUpdating={true}
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
