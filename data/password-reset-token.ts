import { GetCommand, db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    // const passwordResetToken = await db.passwordResetToken.findFirst({
    //   where: { email }
    // });
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: {
        partition: "user",
        email: email
      }
    });

    const response = await db.send(command);
    const passwordResetToken = response.Item.token;

    return passwordResetToken;
  } catch {
    return null;
  }
};
