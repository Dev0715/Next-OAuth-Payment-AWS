import s3 from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

export const uploadFileToS3 = async (file: File) => {
  const Body = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket,
    Key: `${file.name}`,
    Body,
    ContentType: "image/jpg"
  });

  try {
    const response = await s3.send(command);
    console.log("__uploadFileToS3__RESPONSE", response);
  } catch (error) {
    console.log("__uploadFileToS3__ERROR", error);
  }
};
