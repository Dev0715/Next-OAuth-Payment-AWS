"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema, UserRegisterSchema } from "@/schemas/auth";
import { createUser, getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const registerUser = async (
  values: z.infer<typeof UserRegisterSchema>
) => {
  const validateFields = UserRegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { avatar } = validateFields.data;
  console.log("__registerCreator", avatar);

  return { success: "Success" };
};
