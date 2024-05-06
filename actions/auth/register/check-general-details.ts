"use server";

import { getAllUsernames } from "@/data/user/all-usernames";
import { getUserByEmail } from "@/data/user/user-by-email";

type Params = {
  username: string;
  email: string;
};

export const checkGeneralDetails = async ({ username, email }: Params) => {
  // Check whether username selected is available
  const response = await getAllUsernames();
  if (response.items) {
    const similarId = response.items.find((item) =>
      item.username.includes(username)
    );
    if (similarId) {
      return { error: "Same or Very similar Username Already Exists!" };
    }
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  return {
    success: true
  };
};
