"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import s3Client from "@/lib/s3";
import { AWS_S3_BUCKETS } from "@/shared/constants/server.constant";

export const uploadFileToS3 = async (file: File, keyName: string) => {
  const Body = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKETS.UPLOAD,
    Key: keyName,
    Body,
    ContentType: file.type
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};
