import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { uploadFileToS3 } from "@/actions/s3/upload-file";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const username = formData.get("username") as string;
    const formDataEntryValues = Array.from(formData.values());

    const pathList: string[] = [];
    await Promise.all(
      formDataEntryValues.map(async (value) => {
        if (value instanceof File) {
          const keyName = `${username}/${uuidv4()}`;
          const response = await uploadFileToS3(value, keyName);
          if (response.success) {
            pathList.push(keyName);
          }
        }
      })
    );

    return NextResponse.json({ success: true, pathList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
