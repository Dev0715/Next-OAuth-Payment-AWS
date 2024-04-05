import { uploadFileToS3 } from "@/data/aws";
import { NextResponse } from "next/server";

type RequestType = {
  formData: () => any;
};

export const POST = async (req: RequestType) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const response = await uploadFileToS3(file.name); // upload connection issue

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
