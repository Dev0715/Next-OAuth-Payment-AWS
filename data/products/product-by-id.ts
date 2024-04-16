"use server";

import db from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

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
};
