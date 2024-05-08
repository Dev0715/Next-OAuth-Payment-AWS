"use server";

import { getUserById, updateUserProducts } from "@/data/user";
import { ProductLink } from "@/shared/types/product.type";

export const addNewProduct = async (userId: string, product: ProductLink) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  if (!existingUser.creator) {
    return { error: "User is not a creator" };
  }

  const creatorData = existingUser.creator;
  creatorData.products = creatorData.products || [];
  creatorData.products.push(product);

  const response = await updateUserProducts({
    userId,
    creator: creatorData
  });

  if (response) {
    return { success: "New product was registered successfully" };
  } else {
    return { error: "Internal server error" };
  }
};
