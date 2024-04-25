"use server";

import { getUserById } from "@/data/user/user-by-id";
import { updateUserProducts } from "@/data/user/products-update";

type ParamsType = {
  productType: string;
  productId: string;
};

export const addNewProduct = async (userId: string, product: ParamsType) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
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
