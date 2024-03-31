import { db, GetCommand } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  console.log("__getUserByEmail__START", email);
  const command = new GetCommand({
    TableName: process.env.NEXT_PUBLIC_AWS_DYNAMODB_TABLE_NAME,
    Key: {
      username: "user1"
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
