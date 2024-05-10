"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

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

  const passwordsMatch = await bcrypt.compare(
    password,
    existingUser.password as string
  );

  if (!passwordsMatch) {
    return { error: "Please input correct current password." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
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
