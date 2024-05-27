"use server";

import * as z from "zod";
import crypto from "crypto-js";

import { PasswordChangeSchema } from "@/schemas/auth/auth";
import { getUserById, updateUserPassword } from "@/data/user";

export const updatePassword = async (
  userId: string,
  values: z.infer<typeof PasswordChangeSchema>
) => {
  const validatedFields = PasswordChangeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "Internal server error!" };
  }

  const { password, newPassword } = validatedFields.data;

  const _hashedPassword = crypto.SHA256(password).toString();
  const passwordsMatch = _hashedPassword === (existingUser.password as string);

  if (!passwordsMatch) {
    return { error: "Current password is incorrect." };
  }

  const hashedPassword = await crypto.SHA256(newPassword).toString();
  const updatedUser = await updateUserPassword({
    userId,
    password: hashedPassword,
    emailVerified: new Date(existingUser.emailVerified as string)
  });

  if (!updatedUser) {
    return {
      error: "Internal server error!"
    };
  }

  return {
    success: "Password updated!"
  };
};
