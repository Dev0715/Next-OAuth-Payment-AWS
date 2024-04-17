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

  const products = existingUser.products || [];

  const response = await updateUserProducts({
    userId,
    products: [...products, product]
  });

  return response;
};
