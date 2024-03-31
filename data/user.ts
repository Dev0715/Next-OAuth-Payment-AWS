import db from "@/lib/db";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const getUserByEmail = async (email: string) => {
  console.log("__getUserByEmail__START", email);
  const command = new QueryCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email
    },
    ConsistentRead: true
  });

  try {
    const response = await db.send(command);
    // const item = response.Item;
    console.log("__getUserByEmail_RESULT", response);
    // return item;
  } catch (error) {
    console.log("__getUserByEmail__ERROR", error);
    return null;
  }
};
