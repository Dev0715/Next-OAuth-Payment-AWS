"use server";

import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  type QueryCommandInput,
  type ScanCommandInput
} from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import { AWS_DYNAMO_TABLES } from "@/shared/constants/server.constant";

import type {
  Product,
  ProductEvent,
  ProductLink,
  ProductState
} from "@/shared/types/product.type";

export const getAllProducts = async (
  limit?: number,
  exclusiveStartKey?: ProductLink
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.PRODUCT
    // ProjectionExpression: "username" // attr names to get
    // ProjectionExpression: "email, emailVerified, #name",
    // ExpressionAttributeNames: { "#name": "name" }, // for reserved attr names
    // FilterExpression: "email = :email",
    // ExpressionAttributeValues: {
    // ":email": email
    // }
    // Limit: 1 // just number of scanned items, not result
  };

  if (exclusiveStartKey) {
    scanCommandInput.ExclusiveStartKey = {
      ...exclusiveStartKey
    };
  }

  if (limit) {
    scanCommandInput.Limit = limit;
  }

  const command = new ScanCommand(scanCommandInput);

  try {
    const response = await db.send(command);
    return {
      items: response.Items as Product[],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};

export const getAllSubmittedProducts = async (
  limit?: number,
  exclusiveStartKey?: ProductLink
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    FilterExpression:
      "approval.state = :submitted or approval.state = :resubmitted",
    ExpressionAttributeValues: {
      ":submitted": "submitted",
      ":resubmitted": "resubmitted"
    }
  };

  if (exclusiveStartKey) {
    scanCommandInput.ExclusiveStartKey = {
      ...exclusiveStartKey
    };
  }

  if (limit) {
    scanCommandInput.Limit = limit;
  }

  const command = new ScanCommand(scanCommandInput);

  try {
    const response = await db.send(command);
    return {
      items: response.Items as Product[],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};

export const getAllRejectedProducts = async (
  limit?: number,
  exclusiveStartKey?: ProductLink
) => {
  const scanCommandInput: ScanCommandInput = {
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    FilterExpression: "approval.state = :rejected",
    ExpressionAttributeValues: {
      ":rejected": "rejected"
    }
  };

  if (exclusiveStartKey) {
    scanCommandInput.ExclusiveStartKey = {
      ...exclusiveStartKey
    };
  }

  if (limit) {
    scanCommandInput.Limit = limit;
  }

  const command = new ScanCommand(scanCommandInput);

  try {
    const response = await db.send(command);
    return {
      items: response.Items as Product[],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};

export const getProductsByType = async (
  productType: string,
  limit: number,
  exclusiveStartKey?: ProductLink
) => {
  const queryCommand: QueryCommandInput = {
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    KeyConditionExpression: "productType = :productType",
    ExpressionAttributeValues: {
      ":productType": productType
    },
    Limit: limit
  };

  if (exclusiveStartKey) {
    queryCommand.ExclusiveStartKey = exclusiveStartKey;
  }

  const command = new QueryCommand(queryCommand);

  try {
    const response = await db.send(command);
    return {
      items: response.Items,
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  } catch (error) {
    return {
      items: []
    };
  }
};

export const getProductsCountByType = async (productType: string) => {
  const queryCommand: QueryCommandInput = {
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    KeyConditionExpression: "productType = :productType",
    ExpressionAttributeValues: {
      ":productType": productType
    },
    Select: "COUNT"
  };

  const command = new QueryCommand(queryCommand);

  try {
    const response = await db.send(command);
    return {
      cnt: response.Count
    };
  } catch (error) {
    return {
      error
    };
  }
};

export const getProductById = async (
  productType: string,
  productId: string
) => {
  const command = new GetCommand({
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    Key: {
      productType,
      productId
    }
  });

  try {
    const response = await db.send(command);
    return response.Item as Product;
  } catch (error) {
    return null;
  }
};

export const createProduct = async (data: Product) => {
  try {
    const command = new PutCommand({
      TableName: AWS_DYNAMO_TABLES.PRODUCT,
      Item: {
        ...data
      }
    });

    await db.send(command);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

type ParamsType = {
  productType: string;
  productId: string;
  approval: { state: ProductState; history: ProductEvent[] };
};

export const updateProductApproval = async ({
  productType,
  productId,
  approval
}: ParamsType) => {
  const command = new UpdateCommand({
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    Key: { productType, productId },
    UpdateExpression: "SET approval = :approval",
    ExpressionAttributeValues: {
      ":approval": approval
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    return null;
  }
};

export const deleteProduct = async (productType: string, productId: string) => {
  const command = new DeleteCommand({
    TableName: AWS_DYNAMO_TABLES.PRODUCT,
    Key: { productType, productId }
  });

  try {
    const response = await db.send(command);
    console.log(response);
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};
