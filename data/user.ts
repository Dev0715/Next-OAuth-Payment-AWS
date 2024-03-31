import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

interface NewUser {
  name?: string | null | undefined;
  email: string;
  password?: string;
  id?: string;
  image?: string | null | undefined;
  emailVerified?: Date | null;
}

interface UserSetToken {
  username: string;
  verificationToken: string;
  expires: Date;
}

export const getUserById = async (id: string) => {
  const command = new GetCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Key: {
      username: id
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

export const updateUserToken = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Key: { username: data.username },
    UpdateExpression:
      "SET verificationToken = :verificationToken, expires = :expires",
    ExpressionAttributeValues: {
      ":verificationToken": data.verificationToken,
      ":expires": data.expires.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserToken__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserToken__UpdateCommand__ERROR", error);
    return null;
  }
};

export const updateUserPassword = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Key: { username: data.username },
    UpdateExpression:
      "SET verificationToken = :verificationToken, expires = :expires",
    ExpressionAttributeValues: {
      ":verificationToken": data.verificationToken,
      ":expires": data.expires.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log(
      "__updateUserVerificationToken__UpdateCommand__RESPONSE",
      response
    );
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserVerificationToken__UpdateCommand__ERROR", error);
    return null;
  }
};
