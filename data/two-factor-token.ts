import { GetCommand, db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    // const twoFactorToken = await db.twoFactorToken.findUnique({
    //   where: { token }
    // });
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: {
        partition: "user",
        token: token
      }
    });

    const response = await db.send(command);
    const twoFactorToken = response.Item.twoFactorToken;

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    // const twoFactorToken = await db.twoFactorToken.findFirst({
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
    const twoFactorToken = response.Item.twoFactorToken;

    return twoFactorToken;
  } catch {
    return null;
  }
};
