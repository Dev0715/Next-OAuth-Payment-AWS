"use server";

import { createProduct } from "@/data/product";
import { Product } from "@/shared/types/product.type";
import { addNewProduct } from "../user/new-product";

export const newProduct = async (product: Product) => {
  const res_create = await createProduct(product);
  if (res_create.error) {
    return { error: "Failed to create product" };
  }

  const res_add = await addNewProduct(product.ownerId, {
    productType: product.productType,
    productId: product.productId
  });
  if (res_add.error) {
    return { error: "Failed to add new product to creator" };
  }

  return { success: "Product created successfully" };
};
