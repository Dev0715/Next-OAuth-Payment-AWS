"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas/auth/auth";
import { getUserByEmail } from "@/data/user/user-by-email";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { updateUserToken } from "@/data/user/token-update";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = generateVerificationToken(existingUser.userId);

    const updatedUser = await updateUserToken({
      userId: existingUser.userId,
      verificationToken,
      expires: new Date(new Date().getTime() + 3600 * 1000)
    });

    const response = await sendVerificationEmail(
      updatedUser.email,
      updatedUser.verificationToken
    );

    if (response.error) {
      return { error: response.error.name };
    }

    return { success: "Confirmation email sent!" };
  }

  let callbackLink = callbackUrl || DEFAULT_LOGIN_REDIRECT;
  if (existingUser.manager) {
    callbackLink = "/approval";
  } else if (existingUser.creator) {
    callbackLink = `/creator/${existingUser.userId}`;
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackLink
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!"
          };
        default:
          return {
            error: "Something went wrong!"
          };
      }
    }
    throw error;
  }

  return {
    success: "Data is Valid, Message Received!"
  };
};
