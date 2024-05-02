"use server";

import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import db from "@/lib/db";
import type { CreatorData } from "@/shared/types/user.type";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

type ParamsType = {
  userId: string;
  creator: CreatorData;
};

export const updateUserProducts = async (data: ParamsType) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId: data.userId
    },
    UpdateExpression: "SET creator = :creator",
    ExpressionAttributeValues: {
      ":creator": data.creator
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
