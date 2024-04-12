"use server";

import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";
import { z } from "zod";
import { CreatorRegisterSchema } from "@/schemas/auth";

const TableName = process.env.AWS_DYNAMODB_TABLE_NAME;

interface NewUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  id?: string;
  image?: string;
  emailVerified?: Date | string;
}

// When social login, consider setting id same as userId into table
// When social login, usernames just comes as name
export const createUser = async (data: NewUser) => {
  if (data.emailVerified && data.emailVerified instanceof Date) {
    data.emailVerified = data.emailVerified.toISOString();
  }

  const currentTime = Math.floor(new Date().getTime() / 1000);
  const userId = data.username + currentTime;
  const verificationToken = generateVerificationToken(userId);
  const expires = new Date(new Date().getTime() + 3600 * 1000).toISOString();

  const command = new PutCommand({
    TableName,
    Item: {
      userId,
      verificationToken,
      expires,
      ...data
    }
  });

  try {
    await db.send(command);
    return verificationToken;
  } catch (error) {
    return null;
  }
};
