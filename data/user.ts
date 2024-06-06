"use server";

import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  type ScanCommandInput,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { AWS_DYNAMO_TABLES } from "@/shared/constants/server.constant";

import type { ProductLink } from "@/shared/types/product.type";
import type { CreatorData, ManagerData, User } from "@/shared/types/user.type";

type UserUpdateToken = {
  userId: string;
  verificationToken: string;
  expires: Date;
};

type CreatorUpdateProduct = {
  userId: string;
  creator: CreatorData;
};

type UserSetPassword = {
  userId: string;
  password: string;
  emailVerified: Date;
};

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

export const getAllManagers = async (
  limit?: number,
  exclusiveStartKey?: string
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.USER,
    FilterExpression: "manager.isManager = :isManager",
    ExpressionAttributeValues: {
      ":isManager": true
    }
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
    console.log(response);
    return {
      items: response.Items,
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    console.error(error);
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
    return { success: true, verificationToken };
  } catch (error) {
    return { error: true };
  }
};

export const updateUserToken = async (data: UserUpdateToken) => {
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
    return {
      success: true,
      updatedUser: response.Attributes
    };
  } catch (error) {
    return {
      error: true
    };
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
    await db.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};

export const updateGeneralProfile = async (userId: string, userData: User) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression:
      "SET avatar = :avatar, username = :username, firstname = :firstname, lastname = :lastname, phone1 = :phone1, phone2 = :phone2, address = :address",
    ExpressionAttributeValues: {
      ":avatar": userData.avatar || "",
      ":username": userData.username,
      ":firstname": userData.firstname,
      ":lastname": userData.lastname,
      ":phone1": userData.phone1 || "",
      ":phone2": userData.phone2 || "",
      ":address": userData.address
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return {
      success: true,
      updatedUser: response.Attributes
    };
  } catch (error) {
    return {
      error: true
    };
  }
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
    return {
      success: true,
      updatedUser: response.Attributes
    };
  } catch (error) {
    return {
      success: false
    };
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
    return {
      success: true,
      updatedUser: response.Attributes
    };
  } catch (error) {
    return {
      error: true
    };
  }
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
    return {
      success: true,
      updatedUser: response.Attributes
    };
  } catch (error) {
    return {
      error: true
    };
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
    await db.send(command);
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      error: true
    };
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
    return {
      success: true,
      updatedUser: response.Attributes
    };
  } catch (error) {
    return {
      error: true
    };
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

export const updateCustomerData = async ({
  userId,
  customerData
}: {
  userId: string;
  customerData: User["customer"];
}) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET customer = :customer",
    ExpressionAttributeValues: {
      ":customer": customerData
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

export const updateAffiliateData = async ({
  userId,
  affiliateData
}: {
  userId: string;
  affiliateData: User["affiliate"];
}) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET affiliate = :affiliate",
    ExpressionAttributeValues: {
      ":affiliate": affiliateData
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

export const deleteUserById = async (userId: string) => {
  const command = new DeleteCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId }
  });

  try {
    await db.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};

export const updateUserEnabled = async (userId: string, enabled: boolean) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.USER,
    Key: { userId },
    UpdateExpression: "SET disabled = :disabled",
    ExpressionAttributeValues: {
      ":disabled": !enabled
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    await db.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
