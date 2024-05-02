"use server";

import db from "@/lib/db";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const deleteBundle = async (bundleId: string) => {
  const command = new DeleteCommand({
    TableName,
    Key: {
      bundleId
    }
  });

  try {
    await db.send(command);
    return { success: true };
  } catch (error) {
    return null;
  }
};
