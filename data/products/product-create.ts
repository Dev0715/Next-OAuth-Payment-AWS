"use server";

import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";
import { z } from "zod";
import { CreatorRegisterSchema } from "@/schemas/auth";

const TableName = process.env.AWS_DYNAMODB_PRODUCTS_TABLE_NAME;

interface NewProduct {
  title: string;
  description: string;
  price: string;
  imageList: string[];
}

export const createProduct = async (userId: string, data: NewProduct) => {
  const command = new PutCommand({
    TableName,
    Item: {
      userId,
      productId: uuidv4(),
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
