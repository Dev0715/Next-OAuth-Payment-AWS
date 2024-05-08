"use server";

import { GetCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import type { User } from "@/shared/types/user.type";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

export const getUserById = async (userId: string) => {
  const command = new GetCommand({
    TableName,
    Key: {
      userId
    }
  });

  try {
    const response = await db.send(command);
    return response.Item as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};
