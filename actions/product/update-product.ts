"use server";

import { createProduct, deleteProduct } from "@/data/product";
import { Product } from "@/shared/types/product.type";

export const updateProduct = async (product: Product) => {
  const res_delete = await deleteProduct(product);
  if (res_delete.error) {
    return { error: "Failed to remove original product" };
  }

  const res_create = await createProduct(product);
  if (res_create.error) {
    return { error: "Failed to update product" };
  }

  // const res_add = await addNewProduct(product.ownerId, {
  //   productType: product.productType,
  //   productId: product.productId
  // });
  // if (res_add.error) {
  //   return { error: "Failed to add new product to creator" };
  // }

  // const res_remove = await deleteProductFromCreator(
  //   product.ownerId,
  //   product.productId
  // );
  // if (res_remove.error) {
  //   return { error: "Failed to remove original product from creator" };
  // }

  return { success: "successful" };
};
