"use server";

import { CreativeFile, Product } from "@/shared/types/product.type";
import { removeFileFromS3 } from "../s3/remove-file";
import { deleteProduct } from "@/data/product";

export const removeProduct = async (product: Product) => {
  const { fileList, previewList } = product;

  fileList.map(async (file: CreativeFile) => {
    await removeFileFromS3(file.path);
  });

  previewList.map(async (keyName: string) => {
    await removeFileFromS3(keyName);
  });

  await deleteProduct(product);
};
