"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import s3Client from "@/lib/s3";

export const removeFileFromS3 = async (keyName: string, bucketName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: keyName
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, response };
  } catch (error) {
    return { error: true };
  }
};
