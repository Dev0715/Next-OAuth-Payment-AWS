import { PassThrough, Readable } from "stream";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import archiver from "archiver";
import { NextRequest } from "next/server";

import s3Client from "@/lib/s3";
import { AWS_S3_BUCKETS } from "@/shared/constants/server.constant";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const fileList = data.fileList;

  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  try {
    for (let i = 0; i < fileList.length; i++) {
      const passThrough = new PassThrough();

      const file = fileList[i];
      const command = new GetObjectCommand({
        Bucket: AWS_S3_BUCKETS.UPLOAD,
        Key: file.path
      });

      const item = await s3Client.send(command);
      (item.Body as Readable).pipe(passThrough);

      archive.append(passThrough, { name: file.name });
    }

    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="image.zip"');
    headers.append("Content-Type", "application/zip");

    archive.finalize();

    const stream = archive as unknown as ReadableStream<Uint8Array>;
    return new Response(stream, {
      headers
    });
  } catch (error) {
    console.error("Error creating zip file:", error);
    return new Response("Internal Server Error", {
      status: 500
    });
  }
};

// ## Can't send fileList in the same manner with POST method ##

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

  try {
    const archive = archiver("zip", {
      zlib: { level: 9 }
    });

    for (let i = 0; i < fileList.length; i++) {
      const passThrough = new PassThrough();

      const file = fileList[i];
      const command = new GetObjectCommand({
        Bucket: AWS_S3_BUCKETS.UPLOAD,
        Key: file.path
      });

      const item = await s3Client.send(command);
      (item.Body as Readable).pipe(passThrough);

      archive.append(passThrough, { name: file.name });
    }

    archive.finalize();
    const stream = archive as unknown as ReadableStream<Uint8Array>;

    const headers = new Headers();
    headers.append(
      "Content-Disposition",
      'attachment; filename="creative-work.zip"'
    );
    headers.append("Content-Type", "application/zip");

    return new Response(stream, {
      headers
    });
  } catch (error) {
    console.error("Error creating zip file:", error);
    return new Response("Internal Server Error", {
      status: 500
    });
  }
};
