"use server";

import { getAllUsernames } from "@/data/user/all-usernames";
import { getUserByEmail } from "@/data/user/user-by-email";
import { createUser } from "@/data/user/user-create";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  // Check whether username selected is available
  const response = await getAllUsernames();
  const similarId = response.items.find((item: { username: string }) =>
    item.username.includes(values.username)
  );
  if (similarId) {
    return { error: "Same Username Already Exists!" };
  }

  const { email, password } = values;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const verificationToken = await createUser({
    ...values,
    password: hashedPassword
  });

  if (verificationToken) {
    await sendVerificationEmail(email, verificationToken);
    return {
      success: "New user registered, Check your mailbox!"
    };
  } else {
    return {
      error: "Internal Server Error!"
    };
  }
};
