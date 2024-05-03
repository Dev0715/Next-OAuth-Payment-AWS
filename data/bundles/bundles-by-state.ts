"use server";

import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";

import type { Bundle, BundleState } from "@/shared/types/bundles.type";

const TableName = process.env.AWS_DYNAMODB_BUNDLES_TABLE_NAME;

export const getAllBundlesByState = async (
  state: BundleState,
  limit?: number,
  exclusiveStartKey?: string
) => {
  const queryCommand: QueryCommandInput = {
    TableName,
    KeyConditionExpression: "#state = :state",
    ExpressionAttributeNames: {
      "#state": "state"
    },
    ExpressionAttributeValues: {
      ":state": state
    }
  };

  if (limit) {
    queryCommand.Limit = limit;
  }

  if (exclusiveStartKey) {
    queryCommand.ExclusiveStartKey = {
      bundleId: exclusiveStartKey
    };
  }

  const command = new QueryCommand(queryCommand);

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
