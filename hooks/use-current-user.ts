import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  // console.log("__User__Session", session);

  return session.data?.user;
};
