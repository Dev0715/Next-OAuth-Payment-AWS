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

export const addProductToCart = async ({ userId, product }: ParamsType) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  const products: ProductInfo[] = existingUser.products || [];
  const existingProduct = products.find(
    (_product) =>
      _product.productType === product.productType &&
      _product.productId === product.productId
  );

  if (existingProduct) {
    return { error: "You can't move your own product to your cart" };
  }

  const cart = existingUser.cart || [];

  const response = await updateUserCart({
    userId,
    newCart: [...cart, product]
  });

  if (response) {
    return { success: "New product was added to your cart successfully" };
  } else {
    return { error: "Internal server error" };
  }
};
