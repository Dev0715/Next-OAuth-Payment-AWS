"use server";

import { getUserById, updateUserVerification } from "@/data/user";
import { getUserIdFromToken } from "@/lib/tokens";

export const newVerification = async (token: string) => {
  if (!token || token.length <= 36) {
    return { error: "Missing token!" };
  }

  const userId = getUserIdFromToken(token);
  console.log("__newVerification__getUserIdFromToken", userId);

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "Invalid Token!" };
  }

  const expires = Date.parse(existingUser.expires);
  if (expires < new Date().getTime()) {
    return { error: "Token is expired!" };
  }

  if (token !== existingUser.verificationToken) {
    return { error: "Invalid Token!" };
  }

  const updatedUser = await updateUserVerification(userId);
  if (!updatedUser) {
    return { error: "Server error!" };
  }

  return { success: "Email verified!" };
};
