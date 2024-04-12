"use server";

import db from "@/lib/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_TABLE_NAME;

interface UserSetPassword {
  userId: string;
  password: string;
  emailVerified: Date;
}

export const updateUserPassword = async (data: UserSetPassword) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId: data.userId
    },
    UpdateExpression:
      "SET password = :password, emailVerified = :emailVerified",
    ExpressionAttributeValues: {
      ":password": data.password,
      ":emailVerified": data.emailVerified.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserPassword__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserPassword__UpdateCommand__ERROR", error);
    return null;
  }
};
