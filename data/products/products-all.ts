"use server";

import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import type { Product } from "@/shared/types/product.type";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

export const getAllProducts = async (
  limit?: number,
  exclusiveStartKey?: string
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName
    // ProjectionExpression: "username" // attr names to get
    // ProjectionExpression: "email, emailVerified, #name",
    // ExpressionAttributeNames: { "#name": "name" }, // for reserved attr names
    // FilterExpression: "email = :email",
    // ExpressionAttributeValues: {
    // ":email": email
    // }
    // Limit: 1 // just number of scanned items, not result
  };

  if (exclusiveStartKey) {
    scanCommandInput.ExclusiveStartKey = {
      bundleId: exclusiveStartKey as string
    };
  }

  if (limit) {
    scanCommandInput.Limit = limit;
  }

  const command = new ScanCommand(scanCommandInput);

  try {
    const response = await db.send(command);
    return {
      items: response.Items as Product[],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};
