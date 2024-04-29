"use server";

import db from "@/lib/db";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

type KeyType = {
  productType: string;
  productId: string;
};

export const getProductsCountByType = async (productType: string) => {
  const queryCommand: QueryCommandInput = {
    TableName,
    KeyConditionExpression: "productType = :productType",
    ExpressionAttributeValues: {
      ":productType": productType
    },
    Select: "COUNT"
  };

  const command = new QueryCommand(queryCommand);

  try {
    const response = await db.send(command);
    return {
      cnt: response.Count
    };
  } catch (error) {
    return {
      error
    };
  }
};
