import { GetCommand, db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    // const verificationToken = await db.verificationToken.findUnique({
    //   where: { token }
    // });
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: {
        partition: "user",
        token: token,
      }
    });

    const response = await db.send(command);
    const verificationToken = response.Item.verificationToken;

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    });

    return verificationToken;
  } catch {
    return null;
  }
};
