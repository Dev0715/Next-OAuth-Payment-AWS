"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
// import { signIn } from "@/auth";
import { signIn } from "next-auth/react";
import { LoginSchema, ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import {
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const verify = async (
  values: z.infer<typeof ResetSchema>,
  callbackUrl?: string | null
) => {
  console.log("VALUES", values);

  const validateFields = ResetSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
		const command = new UpdateCommand({
			TableName: process.env.DYNAMODB_TABLE_NAME,
			Key: {
				partitionId: 'user',
				sortId: email
			},
			Item: {
				emailVerified: time(),
				// isTwoFactorEnabled: false
			}
		});
		db.send(command);
  }

  return { success: "Data is Valid, Message Received!" };
};
