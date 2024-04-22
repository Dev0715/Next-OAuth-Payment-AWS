"use server";

import { z } from "zod";
import { getAllUsernames } from "@/data/user/all-usernames";
import { getUserByEmail } from "@/data/user/user-by-email";
import { GeneralDetailsSchema } from "@/schemas/auth/register";

export const checkGeneralDetails = async (
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
    return { error: "Same or Very similar Username Already Exists!" };
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  return {
    success: true
  };
};
