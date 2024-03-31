"use server";

import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

import { ResetSchema } from "@/schemas";
import { getUserByEmail, updateUser } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const verificationToken = uuidv4();

  const updatedUser = await updateUser({
    username: existingUser.username,
    verificationToken: existingUser.username + verificationToken,
    expires: new Date(new Date().getTime() + 3600 * 1000)
  });

  if (!updatedUser) {
    return { error: "Server Error" };
  }

  // const passwordResetToken = await generatePasswordResetToken(email);
  const response = await sendPasswordResetEmail(
    updatedUser.email,
    updatedUser.token
  );
  if (response.error) {
    return { error: response.error.name };
  }

  return { success: "Reset email sent!" };
};
