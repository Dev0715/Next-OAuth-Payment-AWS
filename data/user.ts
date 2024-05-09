"use server";

import {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  type ScanCommandInput
} from "@aws-sdk/lib-dynamodb";
import { z } from "zod";

import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { ProfileSchema } from "@/schemas/user";
import { CreatorSettingsSchema } from "@/schemas/auth/auth";
import { AWS_DYNAMO_TABLES } from "@/shared/constants/server.constant";

import type { CreatorData, ManagerData, User } from "@/shared/types/user.type";
import type { ProductLink } from "@/shared/types/product.type";

export const getAllUsers = async (
  limit?: number,
  exclusiveStartKey?: string
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.USER
  };

  if (exclusiveStartKey) {
    scanCommandInput.ExclusiveStartKey = {
      userId: exclusiveStartKey as string
    };
  }

  if (limit) {
    scanCommandInput.Limit = limit;
  }

  const command = new ScanCommand(scanCommandInput);

  try {
    const response = await db.send(command);
    return {
      items: response.Items,
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};

export const getUserByEmail = async (email: string) => {
  const command = new ScanCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    // ProjectionExpression: "email, emailVerified", // attr names to get
    // ProjectionExpression: "email, emailVerified, #name",
    // ExpressionAttributeNames: { "#name": "name" }, // for reserved attr names
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email
    }
    // Limit: 1 // # just number of scanned items, not result
  });

  try {
    const response = await db.send(command);
    if (response.Count && response.Items) return response.Items[0];
    else return null;
  } catch (error) {
    return null;
  }
};

export const getAllUsernames = async () => {
  const command = new ScanCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
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
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId }
  });

  try {
    const response = await db.send(command);
    return response.Item as User;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
    TableName: AWS_DYNAMO_TABLES.USER,
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

type UserSetToken = {
  userId: string;
  verificationToken: string;
  expires: Date;
};

export const updateUserToken = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId: data.userId },
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
    return response.Attributes;
  } catch (error) {
    return null;
  }
};

export const updateUserVerification = async (userId: string) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
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

export const updateGeneralProfile = async (
  userId: string,
  values: z.infer<typeof ProfileSchema>
) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression:
      "SET avatar = :avatar, username = :username, firstname = :firstname, lastname = :lastname",
    ExpressionAttributeValues: {
      ":avatar": values.avatar || "",
      ":username": values.username,
      ":firstname": values.firstname,
      ":lastname": values.lastname
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type CreatorUpdateProduct = {
  userId: string;
  creator: CreatorData;
};

export const updateUserProducts = async (data: CreatorUpdateProduct) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId: data.userId },
    UpdateExpression: "SET creator = :creator",
    ExpressionAttributeValues: {
      ":creator": data.creator
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    return null;
  }
};

export const updateUserPurchased = async ({
  userId,
  newPurchasedProducts
}: {
  userId: string;
  newPurchasedProducts: ProductLink[];
}) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET purchasedProducts = :purchasedProducts",
    ExpressionAttributeValues: {
      ":purchasedProducts": newPurchasedProducts
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserPurchased__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserPurchased__UpdateCommand__ERROR", error);
    return null;
  }
};

type UserSetPassword = {
  userId: string;
  password: string;
  emailVerified: Date;
};

export const updateUserPassword = async (data: UserSetPassword) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId: data.userId },
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

export const updateManagerProfile = async (
  userId: string,
  manager: ManagerData
) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
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

export const updateUserCart = async ({
  userId,
  newCart
}: {
  userId: string;
  newCart: ProductLink[];
}) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET cart = :cart",
    ExpressionAttributeValues: {
      ":cart": newCart
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    return null;
  }
};

export const updateCreatorData = async ({
  userId,
  creatorData
}: {
  userId: string;
  creatorData: User["creator"];
}) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET creator = :creator",
    ExpressionAttributeValues: {
      ":creator": creatorData
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    return null;
  }
};

export const updateCreatorData = async ({
  userId,
  creatorData
}: {
  userId: string;
  creatorData: User["creator"];
}) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET creator = :creator",
    ExpressionAttributeValues: {
      ":creator": creatorData
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    console.error(error);
    return null;
  }
};
