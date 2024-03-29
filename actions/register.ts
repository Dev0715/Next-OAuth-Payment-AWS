"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword", hashedPassword);
  const existingUser = await getUserByEmail(email);

  //   console.log("existingUser", existingUser);
  //   if (existingUser) {
  //     return { error: "Email already in use!" };
  //   }

  //   await db.user.create({
  //     data: {
  //       name,
  //       email,
  //       password: hashedPassword
  //     }
  //   });

  const command = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: {
      partition: "user",
      email: email,
      name: name,
      password: hashedPassword
    }
  });

  try {
    const response = await db.send(command);
    console.log("new_user", response);
  } catch (error) {
    console.log("new_user", error);
  }

  //   try {
  //     const response = await db.send(command);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   //   const verificationToken = await generateVerificationToken(email);
  //   //   await sendVerificationEmail(verificationToken.email, verificationToken.token);
  //   await sendVerificationEmail(email, "AAAAAA");

  return { success: "Data is Valid, Message Received!" };
};
