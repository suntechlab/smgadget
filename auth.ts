import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }) {
      if (account) {
        token.access_token = account.access_token;
      }
      if (profile) {
        // token.role = profile.type;
      }
      if (user) {
        // token.name = user.name;
        // token.email = user.email;
        // token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      // session.user.name = token.name;
      // session.user.email = token.email as string;
      // session.user.image = token.picture;
      return session;
    },
  },
  pages:{
    signIn:"/signin"
  }
});
