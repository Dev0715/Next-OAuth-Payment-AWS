"use server";

import { PutCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";

import type { Bundle } from "@/shared/types/bundles.type";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const createBundle = async (data: Bundle) => {
  try {
    const command = new PutCommand({
      TableName,
      Item: data
    });

    await db.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
