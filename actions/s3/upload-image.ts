import s3Client from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_BUCKET_NAME;

export const uploadFileToS3 = async (file: File, keyName: string) => {
  const Body = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket,
    Key: keyName,
    Body,
    ContentType: "image/jpeg"
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};
