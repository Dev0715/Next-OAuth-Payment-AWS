"use server";

import { getUserById, updateUserProducts } from "@/data/user";

export const deleteProductFromCreator = async (
  userId: string,
  productId: string
) => {
  const existingUser = await getUserById(userId);
  if (!existingUser || !existingUser.email) {
    return { error: "Internal server error" };
  }

  if (!existingUser.creator) {
    return { error: "User is not a creator" };
  }

  const creatorData = existingUser.creator;
  creatorData.products = creatorData.products || [];
  creatorData.products = creatorData.products.filter(
    (item) => item.productId !== productId
  );

  const response = await updateUserProducts({
    userId,
    creator: creatorData
  });

  if (response.success) {
    return { success: "New product was registered successfully" };
  } else {
    return { error: "Internal server error" };
  }
};
