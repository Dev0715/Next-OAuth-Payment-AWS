"use server";

import db from "@/lib/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

export const updateUserProducts = async (data) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId: data.userId
    },
    UpdateExpression: "SET products = :products",
    ExpressionAttributeValues: {
      ":products": data.products
    },
    ReturnValues: "ALL_NEW"
  });
};
