"use server";

import db from "@/lib/db";
import { ProductLink } from "@/shared/types/types-user";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

export const getProductsByType = async (
  productType: string,
  limit: number,
  exclusiveStartKey?: ProductLink
) => {
  const queryCommand: QueryCommandInput = {
    TableName,
    KeyConditionExpression: "productType = :productType",
    ExpressionAttributeValues: {
      ":productType": productType
    },
    Limit: limit
  };

  if (exclusiveStartKey) {
    queryCommand.ExclusiveStartKey = exclusiveStartKey;
  }

  const command = new QueryCommand(queryCommand);

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
