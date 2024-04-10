import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import adapter from "@/adapter";
import { getUserByEmail } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error"
  // },
  events: {
    async linkAccount({ user }) {
      console.log("__EVENTS__linkAccount", user);
      // await db.user.update({
      //   where: { id: user.id },
      //   data: { emailVerified: new Date() }
      // });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("__CALLBACK__signIn", user, account);
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
      console.log("__CALLBACK__session", token, session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.userId = token.userId as string;
      }

      return session;
    },
    async jwt({ token }) {
      console.log("__CALLBACK__jwt", token);
      // if (!token.email) return token;
      // const existingUser = await getUserByEmail(token.email);
      // if (!existingUser) return token;
      // token.isOAuth = !existingUser;
      // token.email = existingUser.email;
      // token.userId = existingUser.userId;  // goes to session function above
      return token;
    }
  },
  ...authConfig
});
