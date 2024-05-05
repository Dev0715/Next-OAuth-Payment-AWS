"use server";

import { ScanCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";

import type { Bundle } from "@/shared/types/bundles.type";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const getAllBundles = async (
  limit?: number,
  exclusiveStartKey?: string
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName
  };

  if (exclusiveStartKey) {
    scanCommandInput.ExclusiveStartKey = {
      bundleId: exclusiveStartKey as string
    };
  }

  if (limit) {
    scanCommandInput.Limit = limit;
  }

  const command = new ScanCommand(scanCommandInput);

  try {
    const response = await db.send(command);
    return {
      items: response.Items as Bundle[],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};
