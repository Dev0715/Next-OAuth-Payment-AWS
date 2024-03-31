import db from "@/lib/db";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export const getUserByEmail = async (email: string) => {
  console.log("__getUserByEmail__START", email);
  const command = new GetItemCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Key: {
      // username: "user1",
      email: email
    }
  });

  try {
    const response = await db.send(command);
    const item = response.Item;
    console.log("__getUserByEmail_RESULT", item);
    return item;
  } catch (error) {
    console.log("__getUserByEmail__ERROR", error);
    return null;
  }
};
