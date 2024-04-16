"use server";

import db from "@/lib/db";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

export const getProductsByType = async (productType: string) => {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "productType = :productType",
    ExpressionAttributeValues: {
      ":productType": productType
    }
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
