import { uploadFileToS3 } from "@/actions/s3/upload-image";
import { NextResponse } from "next/server";

type RequestType = {
  formData: () => any;
};

export const POST = async (req: RequestType) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const keyName = formData.get("product");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const response = await uploadFileToS3(file, keyName);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
