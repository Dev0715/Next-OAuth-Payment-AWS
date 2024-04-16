"use server";

import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

interface NewProduct {
  productType: string;
  title: string;
  description: string;
  price: string;
  imageList: string[];
}

export const createProduct = async (ownerId: string, data: NewProduct) => {
  const command = new PutCommand({
    TableName,
    Item: {
      productId: uuidv4(),
      ownerId,
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
