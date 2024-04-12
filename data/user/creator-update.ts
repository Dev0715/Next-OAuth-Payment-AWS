"use server";

import db from "@/lib/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import { CreatorRegisterSchema } from "@/schemas/auth";

const TableName = process.env.AWS_DYNAMODB_TABLE_NAME;

export const updateCreatorProfile = async (
  userId: string,
  values: z.infer<typeof CreatorRegisterSchema>
) => {
  const command = new UpdateCommand({
    TableName,
    Key: {
      userId
    },
    UpdateExpression:
      "SET username = :username, firstname = :firstname, lastname = :lastname, email = :email, typeOfUser = :typeOfUser, address = :address, phone1 = :phone1, phone2 = :phone2",
    ExpressionAttributeValues: {
      ":username": values.username,
      ":firstname": values.firstname,
      ":lastname": values.lastname,
      ":email": values.email,
      ":typeOfUser": values.typeOfUser,
      ":address": values.address,
      ":phone1": values.phone1,
      ":phone2": values.phone2
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserVerification__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserVerification__UpdateCommand__ERROR", error);
    return null;
  }
};
