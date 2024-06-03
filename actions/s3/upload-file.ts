"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import s3Client from "@/lib/s3";

export const uploadFileToS3 = async (
  file: File,
  bucketName: string,
  keyName: string
) => {
  const Body = Buffer.from(await file.arrayBuffer());

  console.log("BUCKET, KEY", bucketName, keyName);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: keyName,
    Body,
    ContentType: file.type
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, response };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
