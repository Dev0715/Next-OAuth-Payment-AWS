"use server";

import { getUserById } from "@/data/user/user-by-id";
import { updateUserCart } from "@/data/user/cart-update";
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

  if (response) {
    return { success: "New product was added to your cart successfully" };
  } else {
    return { error: "Internal server error" };
  }
};
