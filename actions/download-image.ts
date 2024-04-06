"use server";

import s3Client from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_BUCKET_NAME;

export const downloadFileFromS3 = async (keyName: string) => {
  const command = new GetObjectCommand({
    Bucket,
    Key: keyName
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};
