"use server";

import db from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

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
    console.log("__getUserById__GetCommand__RESPONSE", response);
    return response.Item;
  } catch (error) {
    console.log("__getUserById__GetCommand__ERROR", error);
    return null;
  }
};
