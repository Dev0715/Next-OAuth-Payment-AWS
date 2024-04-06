import s3Client from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_BUCKET_NAME;

export const uploadFileToS3 = async (file: File) => {
  console.log("__upload__File__to__S3", file);

  const Body = Buffer.from(await file.arrayBuffer());

  console.log("__upload__File__to__S3");

  const command = new PutObjectCommand({
    Bucket,
    Key: `${file.name}`,
    Body,
    ContentType: "image/jpeg"
  });

  try {
    const response = await s3Client.send(command);
    console.log("__uploadFileToS3__RESPONSE", response);
    return { success: true, response }; // Need to be updated with the actual file name got from response
  } catch (error) {
    console.log("__uploadFileToS3__ERROR", error);
    return { success: false, error };
  }
};
