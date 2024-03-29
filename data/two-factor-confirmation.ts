import { GetCommand, db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (email: string) => {
  try {
    // const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
    //   where: { userId }
    // });

    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: {
        partition: "user",
        email: email
      }
    });
    const response = await db.send(command);
    const twoFactorConfirmation = response.Item.token;

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
