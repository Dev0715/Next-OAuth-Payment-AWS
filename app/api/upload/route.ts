import { uploadFileToS3 } from "@/data/aws";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  try {
    const formData = await req.body.formData();
    const file = formData.get("file");

    console.log("__FILE__", file);

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const response = await uploadFileToS3(file);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
