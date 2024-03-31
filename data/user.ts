import { db, GetCommand } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName: "tbl_users",
    Key: {
      id: "king"
    }
  });

  try {
    const response = await db.send(command);
    console.log("getUserByEmail", response);
    const item = response.item;
    return item;
  } catch (error) {
    console.log("getUserByEmail", error);
    return null;
  }
};
