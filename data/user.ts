import db from "@/lib/db";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const getUserByEmail = async (email: string) => {
  console.log("__getUserByEmail__START", email);
  const command = new ScanCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    ProjectionExpression: "#email, username",
    Limit: 1,
    ExpressionAttributeNames: { "#email": email }
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
