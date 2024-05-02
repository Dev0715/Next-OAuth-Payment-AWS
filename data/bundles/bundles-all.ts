"use server";

import { ScanCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";

import type { Bundle } from "@/shared/types/bundles.type";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const getAllBundles = async () => {
  const command = new ScanCommand({
    TableName
  });

  try {
    const response = await db.send(command);
    return response.Items as Bundle[];
  } catch (error) {
    return [];
  }
};
