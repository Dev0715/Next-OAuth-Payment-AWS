import { axiosClient, axiosConfig } from "@/lib/axios";

export const uploadImage = async (file: File, keyName: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("keyName", keyName);
    const response = await axiosClient.post("/upload", formData, axiosConfig);
    return response.data.success;
  } catch (error) {
    return false;
  }
};
