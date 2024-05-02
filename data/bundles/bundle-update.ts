"use server";

import db from "@/lib/db";
import { Bundle } from "@/shared/types/types-bundles";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const updateBundle = async (bundle: Bundle) => {
  const command = new UpdateCommand({
    TableName,
    Key: { bundleId: bundle.bundleId },
    UpdateExpression:
      "SET description = :description, #state = :state, price = :price, products = :products",
    ExpressionAttributeNames: {
      "#state": "state"
    },
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
    console.error(error);
    return null;
  }
};
