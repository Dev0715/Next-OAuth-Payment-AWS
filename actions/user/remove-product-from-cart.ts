"use server";

import { getUserById, updateUserCart } from "@/data/user";
import type { ProductLink } from "@/shared/types/product.type";

type ParamsType = {
  userId: string;
  product: ProductLink;
};

export const removeProductFromCart = async ({
  userId,
  product
}: ParamsType) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  const cart = existingUser.customer?.cart || [];
  const newCart = cart.filter(
    (item: ProductLink) => item.productId !== product.productId
  );

  const response = await updateUserCart({
    userId,
    newCart
  });

  if (response.success) {
    return { success: "New product was added to your cart successfully" };
  } else {
    return { error: "Internal server error" };
  }
};
