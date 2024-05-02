"use server";

import { PutCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import type { Product } from "@/shared/types/product.type";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

export const createProduct = async (data: Product) => {
  try {
    const command = new PutCommand({
      TableName,
      Item: {
        ...data
      }
    });

    await db.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
