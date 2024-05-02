"use server";

import db from "@/lib/db";
import { Bundle } from "@/shared/types/types-bundles";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

type ParamsType = {
  bundle: Bundle;
};

export const updateProductApproval = async ({ bundle }: ParamsType) => {
  const command = new UpdateCommand({
    TableName,
    Key: { bundleId: bundle.bundleId },
    UpdateExpression:
      "SET description = :description, state: :state, price: :price, products: :products",
    ExpressionAttributeValues: {
      ":description": bundle.description,
      ":state": bundle.state,
      ":price": bundle.price,
      ":products": bundle.products
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
