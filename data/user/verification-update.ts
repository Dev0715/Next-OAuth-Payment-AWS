"use server";

import db from "@/lib/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

export const updateUserVerification = async (userId: string) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
    UpdateExpression: "SET emailVerified = :emailVerified",
    ExpressionAttributeValues: {
      ":emailVerified": new Date().toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserVerification__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserVerification__UpdateCommand__ERROR", error);
    return null;
  }
};
