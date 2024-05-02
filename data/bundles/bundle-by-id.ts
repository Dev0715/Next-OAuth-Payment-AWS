"use server";

import db from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

import type { Bundle } from "@/shared/types/bundles.type";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const getBundleById = async (bundleId: string) => {
  try {
    const command = new GetCommand({
      TableName,
      Key: {
        bundleId
      }
    });

    const response = await db.send(command);
    return response.Item as Bundle;
  } catch (error) {
    return null;
  }
};
