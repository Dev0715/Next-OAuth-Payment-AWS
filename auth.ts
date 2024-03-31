import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import adapter from "./adapter";

export const { handlers, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error"
  // },
  events: {
    async linkAccount({ user }) {
      console.log("EVENTS__linkAccount", user);
      // await db.user.update({
      //   where: { id: user.id },
      //   data: { emailVerified: new Date() }
      // });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("CALLBACK__signIn", user, account);
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
      console.log("CALLBACK__session", token, session);
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
      console.log("CALLBACK__jwt", token);
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
