"use server";

import { GetCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";

import type { Product } from "@/shared/types/product.type";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

export const getProductById = async (
  productType: string,
  productId: string
) => {
  const command = new GetCommand({
    TableName,
    Key: {
      productType,
      productId
    }
  });

  try {
    const response = await db.send(command);
    console.log("__getProductById__GetCommand__RESPONSE", response);
    return response.Item as Product;
  } catch (error) {
    console.log("__getProductById__GetCommand__ERROR", error);
    return null;
  }
};
