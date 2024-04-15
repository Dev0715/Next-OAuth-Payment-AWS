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

    const userId = formData.get("userId");
    const productData = JSON.parse(formData.get("product") as string);

    const productFiles: string[] = [];
    const formDataEntryValues = Array.from(formData.values());

    await Promise.all(formDataEntryValues.map(async (value) => {
      if (value instanceof File) {
        const keyName = uuidv4();
        const response = await uploadFileToS3(value, keyName);
        if (response.success) {
          productFiles.push(keyName);
        }
      }
    }));

    if(productFiles.length === 0) {
      return NextResponse.json({ success: false, error: "Failed to upload images" }, { status: 500 });
    }

    const response = await createProduct(userId, {
      ...productData,
      imageList: productFiles
    });

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
