import { uploadFileToS3 } from "@/actions/s3/upload-image";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

type RequestType = {
  formData: () => any;
};

export const POST = async (req: RequestType) => {
  try {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    const productFiles = [];

    formDataEntryValues.forEach(async (value) => {
      if (value instanceof File) {
        const keyName = uuidv4();
        const response = await uploadFileToS3(value, keyName);
        productFiles.push(keyName);
      } else {
        const product = JSON.parse(value as string);
        console.log(product);
      }
    });

    // # Save product files to user data

    // if (response.success) {
    //   return NextResponse.json(response, { status: 200 });
    // } else {
    //   return NextResponse.json(response, { status: 500 });
    // }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
