"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { createUser } from "@/data/user/user-create";
import { sendVerificationEmail } from "@/lib/mail";
import { getAllUsernames } from "@/data/user/all-usernames";
import { getUserByEmail } from "@/data/user/user-by-email";
import { GeneralDetailsSchema } from "@/schemas/auth/register";

export const register = async (
  values: z.infer<typeof GeneralDetailsSchema>
) => {
  const validateFields = GeneralDetailsSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  // Check whether username selected is available
  const response = await getAllUsernames();
  const similarId = response.items.find((item: { username: string }) =>
    item.username.includes(values.username)
  );
  if (similarId) {
    return { error: "Same Username Already Exists!" };
  }

  const { email, password, username, firstname, lastname } =
    validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const verificationToken = await createUser({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword
  });

  if (verificationToken) {
    await sendVerificationEmail(email, verificationToken);
    return {
      success: "New user registered, Check your mailbox!"
    };
  } else {
    return {
      error: "Server Error!"
    };
  }
};
