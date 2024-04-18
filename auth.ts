import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import adapter from "@/adapter";
import { getUserByEmail } from "./data/user/user-by-email";
import { getUserById } from "./data/user/user-by-id";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error"
  // },
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
      if (session.user) {
        session.user = {
          ...session.user,
          ...token,
          email: token.email as string
        };
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub as string);
      if (!existingUser) return token;
      return existingUser; // to token in `session` func
    }
  },
  ...authConfig
});
