import { axiosClient, axiosConfig } from "@/lib/axios";
import { AWS_S3_BUCKETS } from "../constants/server.constant";

export const uploadImage = async (file: File, keyName: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", AWS_S3_BUCKETS.LISTING as string);
    formData.append("keyName", keyName);
    const response = await axiosClient.post("/upload", formData, axiosConfig);
    return response.data.success;
  } catch (error) {
    return false;
  }
};
