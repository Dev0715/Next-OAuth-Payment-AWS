import crypto from "crypto-js";
import { v4 as uuidv4 } from "uuid";

const getNumericArrayFromString = (str: string) => {
  const numericArray = str
    .split("")
    .map((char) => char.charCodeAt(0).toString());
  const joinedStr = numericArray.join("-");
  return joinedStr;
};

export const generateVerificationToken = (userId: string) => {
  const token = uuidv4();
  const encrypted = crypto.AES.encrypt(userId, token).toString();
  // const numericStr = getNumericArrayFromString(encrypted);
  const verificationToken = token + numericStr;

  return verificationToken;
};

export const getUserIdFromToken = (token: string) => {
  const tokenId = token.slice(0, 36);
  const encryptedUserId = token.slice(36);
  // const encryptedStr = String.fromCharCode(
  // ...encryptedUserId.split("-").map((str) => Number(str))
  // );
  const bytes = crypto.AES.decrypt(encryptedStr, tokenId);
  const decryptedUserId = bytes.toString(crypto.enc.Utf8);

  return decryptedUserId;
};
