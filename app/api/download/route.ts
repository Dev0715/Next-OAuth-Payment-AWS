import archiver from "archiver";
import { PassThrough, Readable } from "stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";
import { NextRequest } from "next/server";

const Bucket = process.env.AWS_BUCKET_NAME;

export const GET = async () => {
  const fileList = [
    {
      name: "kre8tive-temp_202404161915.rar",
      path: "f7554959-06ef-453b-af79-0d7e483b500c"
    },
    {
      name: "Samuel_RTR.docx",
      path: "b7750835-e4fa-4ee7-828c-a8eafcb63848"
    }
  ];

  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  for (let i = 0; i < fileList.length; i++) {
    const passThrough = new PassThrough();

    const file = fileList[i];
    const command = new GetObjectCommand({ Bucket, Key: file.path });

    const item = await s3Client.send(command);
    (item.Body as Readable).pipe(passThrough);

    archive.append(passThrough, { name: file.name });
  }

  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="image.zip"');
  headers.append("Content-Type", "application/zip");

  archive.finalize();

  const stream = archive as unknown as ReadableStream<Uint8Array>;
  const response = new Response(stream, {
    headers
  });

  return response;
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const fileList = [
    {
      name: "kre8tive-temp_202404161915.rar",
      path: "f7554959-06ef-453b-af79-0d7e483b500c"
    },
    {
      name: "Samuel_RTR.docx",
      path: "b7750835-e4fa-4ee7-828c-a8eafcb63848"
    }
  ];

  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  for (let i = 0; i < fileList.length; i++) {
    const passThrough = new PassThrough();

    const file = fileList[i];
    const command = new GetObjectCommand({ Bucket, Key: file.path });

    const item = await s3Client.send(command);
    (item.Body as Readable).pipe(passThrough);

    archive.append(passThrough, { name: file.name });
  }

  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="image.zip"');
  headers.append("Content-Type", "application/zip");

  archive.finalize();

  const stream = archive as unknown as ReadableStream<Uint8Array>;
  const response = new Response(stream, {
    headers
  });

  return response;
};
