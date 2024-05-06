"use server";

import { getUserById } from "@/data/user/user-by-id";
import { updateUserCart } from "@/data/user/cart-update";
import type { ProductLink } from "@/shared/types/product.type";

type ParamsType = {
  userId: string;
  product: ProductLink;
};

export const addProductToCart = async ({ userId, product }: ParamsType) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  const products: ProductLink[] = existingUser.creator?.products || [];
  const ownProduct = products.find(
    (_product) => _product.productId === product.productId
  );
  if (ownProduct) {
    return { error: "You can't move your own product to your cart" };
  }

  const cart: ProductLink[] = existingUser.customer?.cart || [];
  const existingOne = cart.find(
    (_product) => _product.productId === product.productId
  );
  if (existingOne) {
    return { error: "It's already in your cart" };
  }

  const purchasedProducts: ProductLink[] =
    existingUser.customer?.purchases || [];
  const existingProduct = purchasedProducts.find(
    (_product) => _product.productId === product.productId
  );
  if (existingProduct) {
    return { error: "You have already purchased this product" };
  }

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
