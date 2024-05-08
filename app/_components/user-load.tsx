"use client";

import { getUserById } from "@/data/user/user-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function LoadUser() {
  const sessionUser = useCurrentUser();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    let ignore = false;

    if (sessionUser && !user) {
      getUserById(sessionUser.userId).then((_user) => {
        if (ignore || !_user) {
          return;
        }
        setUser(_user);
      });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return <></>;
}
