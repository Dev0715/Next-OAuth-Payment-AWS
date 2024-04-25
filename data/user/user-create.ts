"use server";

import db from "@/lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

// When social login, consider setting id same as userId into table
// When social login, usernames just comes as name
export const createUser = async (data: any) => {
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
      ...data,
      userId,
      verificationToken,
      expires
    }
  });

  try {
    await db.send(command);
    return verificationToken;
  } catch (error) {
    return null;
  }
};
