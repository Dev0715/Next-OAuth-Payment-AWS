import { uploadFileToS3 } from "@/actions/s3/upload-image";
import { NextResponse } from "next/server";

type RequestType = {
  formData: () => any;
};

export const POST = async (req: RequestType) => {
  try {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    formDataEntryValues.forEach((value) => {
      if (value instanceof File) {
      } else {
        const product = JSON.parse(value as string);
        console.log(product);
      }
    });

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
