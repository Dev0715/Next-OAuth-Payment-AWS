import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Apple from "next-auth/providers/apple";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ""
    }),
    Github({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string
    }),
    Discord({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET || ""
    }),
    Apple({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET || ""
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUserByEmail(email as string);
        if (!user || !user.password) return null;
        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        if (passwordsMatch) return user;
        else return null;
      }
    })
  ]
} satisfies NextAuthConfig;
