"use server";

import { z } from "zod";
import NextAuth from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password, code } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return { error: "Invalid credentials!" };
    //     default:
    //       return { error: "Something went wrong!" };
    //   }
    // }

    throw error;
  }

  return { success: "Data is Valid, Message Received!" };
};
