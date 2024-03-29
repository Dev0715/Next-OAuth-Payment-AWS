import { db } from "@/lib/db";

export const getAccountByEmail = async (email: string) => {
  try {
    // const account = await db.account.findFirst({
    //   where: { userId }
    // });
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: {
        partition: "user",
        email: email
      }
    });

    const account = await db.send(command);

    return account;
  } catch {
    return null;
  }
};
