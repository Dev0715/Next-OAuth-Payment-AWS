import { NextResponse } from "next/server";

export const POST = async (request: { formData: () => any }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    console.log("__FILE__", file);

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
};
