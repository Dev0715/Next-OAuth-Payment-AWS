"use server";

import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Product } from "@/shared/product-interface";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

export const createProduct = async (data: Product) => {
  const command = new PutCommand({
    TableName,
    Item: {
      ...data
    }
  });

  try {
    await db.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
