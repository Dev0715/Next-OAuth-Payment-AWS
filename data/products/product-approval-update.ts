"use server";

import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";

import type { ProductEvent, ProductState } from "@/shared/types/product.type";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

type ParamsType = {
  productType: string;
  productId: string;
  approval: { state: ProductState; history: ProductEvent[] };
};

export const updateProductApproval = async ({
  productType,
  productId,
  approval
}: ParamsType) => {
  const command = new UpdateCommand({
    TableName,
    Key: { productType, productId },
    UpdateExpression: "SET approval = :approval",
    ExpressionAttributeValues: {
      ":approval": approval
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    return null;
  }
};
