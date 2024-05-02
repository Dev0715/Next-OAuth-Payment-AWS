import { axiosClient, axiosConfig } from "@/lib/axios";
import { v4 as uuidv4 } from "uuid";

import type { User } from "../types/user.type";
import type { SignedUpData } from "../types/signup-data.type";

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

export const getUserFromGeneralDetails = async (
  generalDetails: SignedUpData["generalDetails"]
) => {
  const user: User = {
    userId: generalDetails.username,
    username: generalDetails.username,
    email: generalDetails.email,
    password: generalDetails.password,
    firstname: generalDetails.firstname,
    lastname: generalDetails.lastname,
    address: {
      address1: generalDetails.address1,
      address2: generalDetails.address2,
      city: generalDetails.city,
      postal: generalDetails.postal,
      country: generalDetails.country
    },
    phone1: generalDetails.phone1,
    phone2: generalDetails.phone2
  };

  if (generalDetails.avatar) {
    const keyName = `${generalDetails.username}/${uuidv4()}`;
    if (await uploadImage(generalDetails.avatar, keyName)) {
      user.avatar = keyName;
    }
  }

  return user;
};
