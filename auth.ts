import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";

import type { Adapter, AdapterUser } from "next-auth/adapters";

import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "@/data/account";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string
  },
  region: process.env.NEXT_AUTH_AWS_REGION
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  }
});

const dbAdapter: Adapter = {
  async createUser(user): Promise<any> {
    return;
  },
  async getUser(id): Promise<any> {
    return;
  },
  async getUserByEmail(email): Promise<any> {
    return;
  },
  async getUserByAccount({ providerAccountId, provider }): Promise<any> {
    return;
  },
  async updateUser(user): Promise<any> {
    return;
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
    return;
  },
  async getSessionAndUser(sessionToken): Promise<any> {
    return;
  },
  async updateSession({ sessionToken }): Promise<any> {
    return;
  },
  async deleteSession(sessionToken): Promise<any> {
    return;
  },
  async createVerificationToken({ identifier, expires, token }): Promise<any> {
    return;
  },
  async useVerificationToken({ identifier, token }): Promise<any> {
    return;
  }
};

export const { handlers, auth } = NextAuth({
  adapter: dbAdapter,
  session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error"
  // },
  // events: {
  //   async linkAccount({ user }) {
  //     // await db.user.update({
  //     //   where: { id: user.id },
  //     //   data: { emailVerified: new Date() }
  //     // });
  //   }
  // },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        // await db.twoFactorConfirmation.delete({
        //   where: { id: twoFactorConfirmation.id }
        // });
      }

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
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    }
  },
  ...authConfig
});
