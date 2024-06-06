"use server";

import crypto from "crypto-js";

import { createUser, getAllUsernames, getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: any) => {
  // Check whether username selected is available
  const response = await getAllUsernames();
  if (response.items) {
    const similarId = response.items.find((item) =>
      item.username.includes(values.username)
    );
    if (similarId) {
      return { error: "Same Username Already Exists!" };
    }
  }

  const { email, password } = values;
  const hashedPassword = await crypto.SHA256(password).toString();
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const res_create = await createUser({
    ...values,
    password: hashedPassword
  });

  if (res_create.success) {
    await sendVerificationEmail(email, res_create.verificationToken);
    return {
      success: "New user registered, Check your mailbox!"
    };
  } else {
    return {
      error: "Internal Server Error!"
    };
  }
};
