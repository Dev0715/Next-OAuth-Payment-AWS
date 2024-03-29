import { db, GetCommand } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName: "kre8tive-scraper-apne1-20240326",
    Key: {
      partition: 'user',
      email: email
    }
  });

  try {
    // console.log("DBCHECK", db);
    const response = await db.send(command);
    const item = response.Item;
    console.log("getUserByEmail RESULT item", item);
    // return item;
  } catch (error) {
    console.log("getUserByEmail", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
