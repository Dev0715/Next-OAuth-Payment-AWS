"use server";

import db from "@/lib/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import type { ManagerData } from "@/shared/types/user.type";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

export const updateManagerProfile = async (
  userId: string,
  manager: ManagerData
) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
    UpdateExpression: "SET manager = :manager",
    ExpressionAttributeValues: {
      ":manager": manager
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log(response);
    return response.Attributes;
  } catch (error) {
    console.error(error);
    return null;
  }
};
