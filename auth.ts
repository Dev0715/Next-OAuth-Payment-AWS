import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";

import type { Adapter, AdapterUser } from "next-auth/adapters";

const dbAdapter: Adapter = {
  async createUser(user): Promise<AdapterUser> {
    return user;
  },
  async getUser(id): Promise<AdapterUser | null> {
    return null;
  },
  async getUserByEmail(email): Promise<AdapterUser | null> {
    return null;
  },
  async getUserByAccount({
    providerAccountId,
    provider
  }): Promise<AdapterUser | null> {
    return null;
  },
  async updateUser(user): Promise<AdapterUser> {
    return user as AdapterUser;
  },
  async deleteUser(userId) {
    return;
  },
  async linkAccount(account) {
    return;
  },
  async unlinkAccount({ providerAccountId, provider }) {
    return;
  },
  async createSession({ sessionToken, userId, expires }): Promise<any> {
    return { sessionToken, userId, expires };
  },
  async getSessionAndUser(sessionToken): Promise<any> {
    return sessionToken;
  },
  async updateSession({ sessionToken }): Promise<any> {
    return sessionToken;
  },
  async deleteSession(sessionToken): Promise<any> {
    return sessionToken;
  },
  async createVerificationToken({ identifier, expires, token }): Promise<any> {
    return { identifier, expires, token };
  },
  async useVerificationToken({ identifier, token }): Promise<any> {
    return { identifier, token };
  }
};

export const { handlers, auth } = NextAuth({
  adapter: dbAdapter,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      // await db.user.update({
      //   where: { id: user.id },
      //   data: { emailVerified: new Date() }
      // });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("SIGN IN CALLED");
      // Allow OAuth without email verification
      // if (account?.provider !== "credentials") return true;

      // const existingUser = await getUserById(user.id as string);

      // // Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false;

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id
      //   );

      //   if (!twoFactorConfirmation) return false;

      //   // Delete two factor confirmation for next sign in
      //   // await db.twoFactorConfirmation.delete({
      //   //   where: { id: twoFactorConfirmation.id }
      //   // });
      // }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      // if (!token.sub) return token;
      // const existingUser = await getUserById(token.sub);
      // if (!existingUser) return token;
      // const existingAccount = await getAccountByUserId(existingUser.id);
      // token.isOAuth = !!existingAccount;
      // token.name = existingUser.name;
      // token.email = existingUser.email;
      // token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    }
  },
  ...authConfig
});
