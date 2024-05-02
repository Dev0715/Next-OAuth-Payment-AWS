import NextAuth, { type DefaultSession } from "next-auth";
import type { User } from "./shared/types/user.type";

export type ExtendedUser = DefaultSession["user"] &
  User & {
    id: string;
    userId: string;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  };

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
