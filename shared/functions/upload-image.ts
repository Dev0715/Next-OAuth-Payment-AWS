import { axiosClient, axiosConfig } from "@/lib/axios";
import { BucketType } from "@/actions/s3/upload-file";

export const uploadImage = async (file: File, keyName: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucketType", "LISTING" as BucketType);
    formData.append("keyName", keyName);
    const response = await axiosClient.post("/upload", formData, axiosConfig);
    return response.data.success;
  } catch (error) {
    return false;
  }
};
