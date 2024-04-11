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

interface UserSetToken {
  userId: string;
  verificationToken: string;
  expires: Date;
}

interface UserSetPassword {
  userId: string;
  password: string;
  emailVerified: Date;
}

export const getAllUsernames = async () => {
  const command = new ScanCommand({
    TableName,
    ProjectionExpression: "username" // attr names to get
    // ProjectionExpression: "email, emailVerified, #name",
    // ExpressionAttributeNames: { "#name": "name" }, // for reserved attr names
    // FilterExpression: "email = :email",
    // ExpressionAttributeValues: {
    // ":email": email
    // }
    // Limit: 1 // just number of scanned items, not result
  });

  try {
    const response = await db.send(command);
    return {
      items: response.Items
    };
  } catch (error) {
    return {
      items: []
    };
  }
};

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

export const getUserByEmail = async (email: string) => {
  const command = new ScanCommand({
    TableName,
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

export const updateUserToken = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId: data.userId
    },
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

export const updateCreatorProfile = async (
  userId: string,
  values: z.infer<typeof CreatorRegisterSchema>
) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
    UpdateExpression:
      "SET username = :username, firstname = :firstname, lastname = :lastname, email = :email, typeOfUser = :typeOfUser, address = :address, phone1 = :phone1, phone2 = :phone2",
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
