import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Apple from "next-auth/providers/apple";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    //    Google({
    //      clientId: process.env.GOOGLE_CLIENT_ID || "",
    //      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    //    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || ""
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
        // !Important: this sets token's `sub` as userId on `jwt` func
        user.id = user.userId;
        if (passwordsMatch) return user;
        else return null; // You can also reject this callback for detailed error
      }
    }),
    {
      id: "adobe",
      name: "Adobe",
      type: "oauth",
      clientId: process.env.ADOBE_CLIENT_ID,
      clientSecret: process.env.ADOBE_CLIENT_SECRET,
      // authorization: { params: { scope: "openid email profile" } },
      // You'll need to specify the correct URLs for Adobe's OAuth service.
      token: `https://ims-na1.adobelogin.com/ims/token/v3?client_id=${process.env.ADOBE_CLIENT_ID}`,
      authorization:
        "https://ims-na1.adobelogin.com/ims/authorize/v3?scope=openid+email+profile",
      userinfo: "https://ims-na1.adobelogin.com/ims/userinfo/v3",
      // A function that takes the token response and returns the profile
      profile: (profile) => {
        // You'll need to map the returned user profile to the profile object that NextAuth expects
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email
        };
      }
    },
    {
      id: "epicgames",
      name: "EpicGames",
      type: "oauth",
      clientId: process.env.EPIC_CLIENT_ID,
      clientSecret: process.env.EPIC_CLIENT_SECRET,
      token: `https://api.epicgames.dev/epic/oauth/v2/token?client_id=${process.env.EPIC_CLIENT_ID}`,
      authorization: `https://www.epicgames.com/id/authorize?client_id=${process.env.EPIC_CLIENT_ID}&response_type=code&scope=basic_profile`,
      userinfo: "https://api.epicgames.dev/epic/oauth/v2/userInfo",
      // A function that takes the token response and returns the profile
      profile: (profile) => {
        // You'll need to map the returned user profile to the profile object that NextAuth expects
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email
        };
      }
    }
  ]
} satisfies NextAuthConfig;
