"use server";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3Client from "@/lib/s3";
import { AWS_S3_BUCKETS } from "@/shared/constants/server.constant";
import { BucketType } from "./upload-file";

export const getLinkFromS3Server = async (
  keyName: string,
  bucketType: BucketType
) => {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKETS[bucketType] as string,
    Key: keyName
  });

  try {
    const response = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return {
      success: true,
      response
    };
  } catch (error) {
    return {
      error: false
    };
  }
};
