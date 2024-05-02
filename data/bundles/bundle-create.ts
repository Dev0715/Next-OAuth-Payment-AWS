"use server";

import db from "@/lib/db";
import { Bundle } from "@/shared/types/bundles.type";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const createBundle = async (data: Bundle) => {
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
