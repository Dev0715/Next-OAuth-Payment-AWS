"use server";

import { getUserById } from "@/data/user/user-by-id";
import { updateUserPurchased } from "@/data/user/purchased-update";
import type { ProductLink } from "@/shared/types/product.type";

type Params = {
  userId: string;
  products: ProductLink[];
};

export const addProductToPurchased = async ({ userId, products }: Params) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  const purchasedProducts = existingUser.purchasedProducts || [];

  const response = await updateUserPurchased({
    userId,
    newPurchasedProducts: [...purchasedProducts, ...products]
  });

  if (response) {
    return { success: "New product was added to your cart successfully" };
  } else {
    return { error: "Internal server error" };
  }
};
