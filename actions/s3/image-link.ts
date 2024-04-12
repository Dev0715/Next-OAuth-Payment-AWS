"use server";

import s3Client from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.AWS_BUCKET_NAME;

export const getS3ImageLink = async (keyName: string) => {
  const command = new GetObjectCommand({
    Bucket,
    Key: keyName
  });

  try {
    const response = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};
