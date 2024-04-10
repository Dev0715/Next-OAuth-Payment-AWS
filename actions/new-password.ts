"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas/auth";
import { getUserById, updateUserPassword } from "@/data/user";
import { getUserIdFromToken } from "@/lib/tokens";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token || token.length <= 36) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const userId = getUserIdFromToken(token);

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

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await updateUserPassword({
    userId,
    password: hashedPassword,
    emailVerified: new Date()
  });

  if (!updatedUser) {
    return {
      error: "Server error!"
    };
  }

  return {
    success: "Password updated!"
  };
};
