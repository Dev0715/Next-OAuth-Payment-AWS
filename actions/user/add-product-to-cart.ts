"use server";

import { getUserById } from "@/data/user/user-by-id";
import { updateUserCart } from "@/data/user/cart-update";
import { ProductLink } from "@/shared/types-user";

type ParamsType = {
  userId: string;
  product: ProductLink;
};

export const addProductToCart = async ({ userId, product }: ParamsType) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  const products: ProductLink[] = existingUser.products || [];
  const ownProduct = products.find(
    (_product) => _product.productId === product.productId
  );
  if (ownProduct) {
    return { error: "You can't move your own product to your cart" };
  }

  const cart: ProductLink[] = existingUser.cart || [];
  const exisitingOne = cart.find(
    (_product) => _product.productId === product.productId
  );
  if (exisitingOne) {
    return { error: "It's already in your cart" };
  }

  const purchasedProducts: ProductLink[] = existingUser.purchasedProducts || [];
  const exisitingProduct = purchasedProducts.find(
    (_product) => _product.productId === product.productId
  );
  if (exisitingProduct) {
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
