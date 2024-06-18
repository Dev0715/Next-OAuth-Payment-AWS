import crypto from "crypto-js";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import Github from "next-auth/providers/github";

import { getUserByEmail } from "./data/user";
import { AUTH_CONFIG } from "./shared/constants/server.constant";

import type { NextAuthConfig } from "next-auth";

import WealthboxProvider from "./wealthboxProvider";

export default {
  secret: AUTH_CONFIG.SECRET,
  providers: [
    WealthboxProvider(),
    Github({
      clientId: AUTH_CONFIG.GITHUB.CLIENT_ID,
      clientSecret: AUTH_CONFIG.GITHUB.CLIENT_SECRET
    }),
    Discord({
      clientId: AUTH_CONFIG.DISCORD.CLIENT_ID,
      clientSecret: AUTH_CONFIG.DISCORD.CLIENT_SECRET
    }),
    Apple({
      clientId: AUTH_CONFIG.APPLE.CLIENT_ID || "",
      clientSecret: AUTH_CONFIG.APPLE.CLIENT_SECRET || ""
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
        const hashedPassword = crypto.SHA256(password as string).toString();
        const passwordMatch = hashedPassword === user.password;
        // !Important: this sets token's `sub` as userId on `jwt` func
        user.id = user.userId;
        if (passwordMatch) return user;
        else return null; // You can also reject this callback for detailed error
      }
    })
  ]
} satisfies NextAuthConfig;
