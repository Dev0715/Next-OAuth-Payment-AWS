"use server";

import db from "@/lib/db";
import { ProfileSchema } from "@/schemas/user";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";

const TableName = process.env.AWS_DYNAMODB_USERS_TABLE_NAME;

export const updateGeneralProfile = async (
  userId: string,
  values: z.infer<typeof ProfileSchema>
) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
    UpdateExpression:
      "SET avatar = :avatar, username = :username, firstname = :firstname, lastname = :lastname",
    ExpressionAttributeValues: {
      ":avatar": values.avatar || "",
      ":username": values.username,
      ":firstname": values.firstname,
      ":lastname": values.lastname
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
