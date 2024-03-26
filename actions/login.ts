"use server";

import { z } from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password, code } = validateFields.data;

  return { success: "Data is Valid, Message Received!" };
};
