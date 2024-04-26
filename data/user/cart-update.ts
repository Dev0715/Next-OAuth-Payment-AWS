"use server";

import db from "@/lib/db";
import { ProductLink } from "@/shared/types/types-user";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

interface PropsType {
  userId: string;
  newCart: ProductLink[];
}

export const updateUserCart = async ({ userId, newCart }: PropsType) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
    UpdateExpression: "SET cart = :cart",
    ExpressionAttributeValues: {
      ":cart": newCart
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserCart__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserCart__UpdateCommand__ERROR", error);
    return null;
  }
};
