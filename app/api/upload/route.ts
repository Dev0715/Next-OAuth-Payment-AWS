import { NextRequest, NextResponse } from "next/server";

import { BucketType, uploadFileToS3 } from "@/actions/s3/upload-file";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucketType = formData.get("bucketType") as BucketType;
    const keyName = formData.get("keyName") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File is required" },
        { status: 400 }
      );
    }

    const response = await uploadFileToS3(file, bucketType, keyName);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
