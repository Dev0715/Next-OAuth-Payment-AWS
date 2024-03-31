import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import { PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

interface NewUser {
  name?: string | null | undefined;
  email: string;
  password?: string;
  id?: string;
  image?: string | null | undefined;
  emailVerified?: Date | null;
}

export const getUserByEmail = async (email: string) => {
  const command = new ScanCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    // ProjectionExpression: "email, emailVerified", // attr names to get
    // ProjectionExpression: "email, emailVerified, #name",
    // ExpressionAttributeNames: { "#name": "name" }, // for reserved attr names
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email
    }
    // Limit: 1 // just number of scanned items, not result
  });

  try {
    const response = await db.send(command);
    console.log("__getUserByEmail__ScanCommand__RESPONSE", response);
    if (response.Count) return response.Items[0];
    else return null;
  } catch (error) {
    console.log("__getUserByEmail__ScanCommand__ERROR", error);
    return null;
  }
};

export const createUser = async (data: NewUser) => {
  const command = new PutCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Item: {
      username: uuidv4(),
      ...data
    }
  });

  try {
    const response = await db.send(command);
    // console.log("__createUser__PutCommand__RESPONSE", response);
    return response;
  } catch (error) {
    console.log("__createUser__PutCommand__ERROR", error);
    return null;
  }
};

export const updateUser = async (data) => {
  const command = new UpdateCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Key: {
      username: data.username
    },
    UpdateExpression: "set verificationToken = :verificationToken",
    ExpressionAttributeValues: {
      ":verificationToken": data.verificationToken
    },
    ReturnValues: "ALL_NEW"
  });
};
