"use server";

import { createProduct, deleteProduct } from "@/data/product";
import { Product, ProductLink } from "@/shared/types/product.type";
import { addNewProduct } from "../user/new-product";
import { deleteProductFromCreator } from "../user/delete-product";

export const updateProduct = async (
  newProduct: Product,
  oldProduct: ProductLink
) => {
  const res_create = await createProduct(newProduct);
  if (!res_create.success) {
    return { error: "Failed to update product" };
  }

  const res_delete = await deleteProduct(
    oldProduct.productType,
    oldProduct.productId
  );
  if (res_delete.error) {
    return { error: "Failed to remove original product" };
  }

  const res_add = await addNewProduct(newProduct.ownerId, {
    productType: newProduct.productType,
    productId: newProduct.productId
  });
  if (res_add.error) {
    return { error: "Failed to add new product to creator" };
  }

  const res_remove = await deleteProductFromCreator(
    newProduct.ownerId,
    oldProduct.productId
  );
  if (res_remove.error) {
    return { error: "Failed to remove original product from creator" };
  }

  return { success: "Product updated successfully" };
};
