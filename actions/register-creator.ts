"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema, CreatorRegisterSchema } from "@/schemas/auth";
import { createUser, getUserByEmail, updateCreatorProfile } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const registerCreator = async (
  userId: string,
  values: z.infer<typeof CreatorRegisterSchema>
) => {
  const validateFields = CreatorRegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { avatar } = validateFields.data;
  console.log("__registerCreator", avatar);

  await updateCreatorProfile(userId, values);

  return { success: "Success" };
};
