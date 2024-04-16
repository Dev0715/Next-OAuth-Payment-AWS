import { uploadFileToS3 } from "@/actions/s3/upload-image";
import { createProduct } from "@/data/products/product-create";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

type RequestType = {
  formData: () => any;
};

export const POST = async (req: RequestType) => {
  try {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    const pathList: string[] = [];
    await Promise.all(
      formDataEntryValues.map(async (value) => {
        if (value instanceof File) {
          const keyName = uuidv4();
          const response = await uploadFileToS3(value, keyName);
          if (response.success) {
            pathList.push(keyName);
          }
        }
      })
    );

    if (pathList.length === 0) {
      return NextResponse.json(
        { success: false, error: "Failed to upload images" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ success: true, pathList }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
