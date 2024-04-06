import { uploadFileToS3 } from "@/actions/upload-image";
import { NextResponse } from "next/server";

type RequestType = {
  formData: () => any;
};

export const POST = async (req: RequestType) => {
  try {
    console.log("__POST__UPLOAD__ROUTE__");

    const formData = await req.formData();
    const file = formData.get("file");

    console.log("__POST__UPLOAD__ROUTE__", file);

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const response = await uploadFileToS3(file); // upload connection issue

    console.log("__POST__UPLOAD__ROUTE__", file);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
