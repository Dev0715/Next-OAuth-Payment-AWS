"use server";

import { z } from "zod";
import { CreatorRegisterSchema } from "@/schemas/auth";
import { updateCreatorProfile } from "@/data/user/creator-update";
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

  const response = await updateCreatorProfile(userId, values);

  if (response) {
    return { success: "Success" };
  } else {
    return { error: "Server Error" };
  }
};
