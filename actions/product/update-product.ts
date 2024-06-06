"use server";

import { createProduct, deleteProduct } from "@/data/product";
import { Product } from "@/shared/types/product.type";

export const updateProduct = async (product: Product) => {
  const res_delete = await deleteProduct(product);
  if (res_delete.error) {
    return {
      error: "Failed to remove original product"
    };
  }

  const res_create = await createProduct(product);
  if (res_create.error) {
    return {
      error: "Failed to update product"
    };
  }

  return {
    success: "successful"
  };
};
