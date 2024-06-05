import type { SignedUpData } from "../types/signup-data.type";
import type { User } from "../types/user.type";

export const getUserFromGeneralDetails = async (
  generalDetails: SignedUpData["generalDetails"]
) => {
  const user: User = {
    userId: generalDetails.username,
    username: generalDetails.username,
    email: generalDetails.email,
    password: generalDetails.password,
    firstname: generalDetails.firstname,
    lastname: generalDetails.lastname
    // address: {
    //   address1: generalDetails.address1,
    //   address2: generalDetails.address2,
    //   city: generalDetails.city,
    //   postal: generalDetails.postal,
    //   country: generalDetails.country
    // },
    // phone1: generalDetails.phone1,
    // phone2: generalDetails.phone2
  };

  // if (generalDetails.avatar) {
  //   const keyName = `${generalDetails.username}/${uuidv4()}`;
  //   if (await uploadImage(generalDetails.avatar, keyName)) {
  //     user.avatar = keyName;
  //   }
  // }

  return user;
};
