"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import s3Client from "@/lib/s3";
import { AWS_S3_BUCKETS } from "@/shared/constants/server.constant";

export const removeFileFromS3 = async (keyName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKETS.DOWNLOAD,
    Key: keyName
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, response };
  } catch (error) {
    return { error: true };
  }
};
