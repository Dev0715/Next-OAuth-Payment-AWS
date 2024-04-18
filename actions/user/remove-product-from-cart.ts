"use server";

import { getUserById } from "@/data/user/user-by-id";
import { updateUserProducts } from "@/data/user/products-update";
import { updateUserCart } from "@/data/user/cart-update";

type ProductInfo = {
  productType: string;
  productId: string;
};

type ParamsType = {
  userId: string;
  product: ProductInfo;
};

export const removeProductFromCart = async ({
  userId,
  product
}: ParamsType) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  const cart = existingUser.cart || [];
  const newCart = cart.filter(
    (item: ProductInfo) => item.productId !== product.productId
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
