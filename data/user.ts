import db from "@/lib/db";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const getUserByEmail = async (email: string) => {
  console.log("__getUserByEmail__START", email);
  const command = new ScanCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    ProjectionExpression: "#email, emailVerified",
    Limit: 1,
    ExpressionAttributeNames: { "#email": email }
  });

  try {
    const response = await db.send(command);
    console.log("__getUserByEmail_RESULT", response);
    if (response.Items.length) {
      return response.Items[0];
    } else return null;
  } catch (error) {
    console.log("__getUserByEmail__ERROR", error);
    return null;
  }
};
