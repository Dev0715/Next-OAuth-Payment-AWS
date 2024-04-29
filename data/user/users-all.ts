"use server";

import db from "@/lib/db";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

export const getAllUsers = async () => {
  const command = new ScanCommand({
    TableName
  });

  try {
    const response = await db.send(command);
    return {
      items: response.Items
    };
  } catch (error) {
    return {
      items: []
    };
  }
};
