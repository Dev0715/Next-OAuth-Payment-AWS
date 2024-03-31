"use server";

import { getUserById, updateUserVerification } from "@/data/user";
// import { getVerificationTokenByToken } from "@/data/verificiation-token";

export const newVerification = async (token: string) => {
  if (!token || token.length !== 36 * 2) {
    // twice of length of uuidv4
    return { error: "Missing token!" };
  }

  const userId = token.slice(0, 36); // length of uuidv4

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "Invalid Token!" };
  }

  const expires = Date.parse(existingUser.expires);
  if (expires < new Date().getTime()) {
    return { error: "Token is expired!" };
  }

  if (token !== existingUser.verificationToken) {
    return { error: "Invalid Token!" };
  }

  const updatedUser = await updateUserVerification(userId);
  if (!updatedUser) {
    return { error: "Server error!" };
  }

  return { success: "Email verified!" };

  // const existingToken = await getVerificationTokenByToken(token);
  // if (!existingToken) {
  //   return { error: "Token does not exist!" };
  // }

  // const hasExpired = new Date(existingToken.expires) < new Date();
  // if (hasExpired) {
  //   return { error: "Token has expired!" };
  // }

  // const existingUser = await getUserByEmail(existingToken.email);
  // if (!existingUser) {
  //   return { error: "Email does not exist!" };
  // }

  // await db.user.update({
  //   where: { id: existingUser.id },
  //   data: {
  //     emailVerified: new Date(),
  //     email: existingToken.email
  //   }
  // });

  // await db.verificationToken.delete({
  //   where: { id: existingToken.id }
  // });
};
