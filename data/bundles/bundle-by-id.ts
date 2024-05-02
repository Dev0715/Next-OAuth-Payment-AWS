"use server";

import db from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const getBundleById = async (bundleId: string) => {
  const command = new GetCommand({
    TableName,
    Key: {
      bundleId
    }
  });

  try {
    const response = await db.send(command);
    return response.Item;
  } catch (error) {
    return null;
  }
};
