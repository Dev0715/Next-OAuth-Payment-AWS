"use server";

import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import type { ProductLink } from "@/shared/types/product.type";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

interface PropsType {
  userId: string;
  newPurchasedProducts: ProductLink[];
}

export const updateUserPurchased = async ({
  userId,
  newPurchasedProducts
}: PropsType) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
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
