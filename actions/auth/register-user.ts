"use server";

import { z } from "zod";

import { CustomerRegisterSchema } from "@/schemas/auth/auth";
// import { generateVerificationToken } from "@/lib/tokens";

export const registerUser = async (
  values: z.infer<typeof CustomerRegisterSchema>
) => {
  const validateFields = CustomerRegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { avatar } = validateFields.data;

  return { success: "Success" };
};
