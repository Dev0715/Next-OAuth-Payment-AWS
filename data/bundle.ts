"use server";

import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  type ScanCommandInput
} from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import { AWS_DYNAMO_TABLES } from "@/shared/constants/server.constant";

import type { Bundle, BundleState } from "@/shared/types/bundles.type";

export const getAllBundles = async (
  limit?: number,
  exclusiveStartKey?: string
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.BUNDLE
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

export const getAllBundlesByState = async (
  state: BundleState,
  limit?: number,
  exclusiveStartKey?: string
) => {
  const queryCommand: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.BUNDLE,
    FilterExpression: "#state = :state",
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

  const command = new ScanCommand(queryCommand);

  try {
    const response = await db.send(command);
    console.log(response);
    return {
      items: response.Items as Bundle[],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    console.error(error);
    return {
      items: []
    };
  }
};

export const getBundleById = async (bundleId: string) => {
  try {
    const command = new GetCommand({
      TableName: AWS_DYNAMO_TABLES.BUNDLE,
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

export const createBundle = async (data: Bundle) => {
  try {
    const command = new PutCommand({
      TableName: AWS_DYNAMO_TABLES.BUNDLE,
      Item: data
    });

    await db.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteBundle = async (bundleId: string) => {
  try {
    const command = new DeleteCommand({
      TableName: AWS_DYNAMO_TABLES.BUNDLE,
      Key: {
        bundleId
      }
    });

    await db.send(command);
    return { success: true };
  } catch (error) {
    return null;
  }
};

export const updateBundle = async (bundle: Bundle) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.BUNDLE,
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
