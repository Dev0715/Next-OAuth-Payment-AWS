"use client";

import { useAtom } from "jotai";

import { useEffect } from "react";

import { getUserById } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { userAtom } from "@/store/user";

import { Loading } from "./loading";

export default function LoadUser({ children }: { children: React.ReactNode }) {
  const sessionUser = useCurrentUser();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (sessionUser && !user) {
      getUserById(sessionUser.userId).then((_user) => {
        if (_user) {
          setUser(_user);
        }
      });
    }
  }, [sessionUser]);

  if (sessionUser && !user) return <Loading />;

  return <>{children}</>;
}
